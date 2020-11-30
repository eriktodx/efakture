import { DatePipe, DecimalPipe } from '@angular/common';
import { InvoiceType } from '../enums/invoice-type.enum';
import { PdfMakeInterface } from '../interfaces/pdf-make-interface';
import { InvoiceModel } from '../models/invoice-model';
import { ItemModel } from '../models/item-model';
import { SettingsModel } from '../models/settings-model';

declare var pdfMake: any;

interface TaxLevel {
  tax: number;
  totalNetAmount: number;
  totalTaxAmount: number;
}

export function createPdfInvoice(data: {
  settings: SettingsModel;
  invoice: InvoiceModel;
  datePipe: DatePipe;
  dateFormat?: string;
  decimalPipe: DecimalPipe;
  decimalFormat?: string;
}): PdfMakeInterface {
  if (data.dateFormat == null) {
    data.dateFormat = 'dd.MM.yyyy';
  }
  if (data.decimalFormat == null) {
    data.decimalFormat = '1.2-2';
  }

  const invoiceName =
    data.invoice.type === InvoiceType.OFFER
      ? 'Ponudba'
      : data.invoice.type === InvoiceType.PRE
      ? 'Predračun'
      : 'Račun';

  const itemToPdfDefinition = (item: ItemModel) => [
    { text: item.code, style: 'td' },
    {
      text: item.name + (item.description ? '\n' + item.description : ''),
      style: 'td',
    },
    {
      text: data.decimalPipe.transform(item.quantity, data.decimalFormat),
      style: 'tdRight',
    },
    { text: item.unit, style: 'td' },
    {
      text: data.decimalPipe.transform(item.price, data.decimalFormat),
      style: 'tdRight',
    },
    {
      text: data.decimalPipe.transform(item.discount, data.decimalFormat),
      style: 'tdRight',
    },
    {
      text: data.decimalPipe.transform(item.tax, data.decimalFormat),
      style: 'tdRight',
    },
    {
      text: data.decimalPipe.transform(item.netAmount, data.decimalFormat),
      style: 'tdRight',
    },
  ];

  const taxPdfDefinition = (taxLevel: TaxLevel) => [
    {},
    {
      text:
        '+' +
        data.decimalPipe.transform(taxLevel.tax, data.decimalFormat) +
        '% od osnove ' +
        data.decimalPipe.transform(taxLevel.totalNetAmount, data.decimalFormat),
      colSpan: 5,
    },
    {},
    {},
    {},
    {},
    {
      text: data.decimalPipe.transform(
        taxLevel.totalTaxAmount,
        data.decimalFormat
      ),
      alignment: 'right',
      colSpan: 2,
    },
    {},
  ];

  const itemPdfDefinitions = [];
  const taxLevels: TaxLevel[] = [];

  for (const item of data.invoice.items) {
    itemPdfDefinitions.push(itemToPdfDefinition(item));
    if (item.tax > 0) {
      let taxLevel = taxLevels.find((x) => x.tax === item.tax);
      if (taxLevel == null) {
        taxLevel = { tax: item.tax, totalNetAmount: 0, totalTaxAmount: 0 };
        taxLevels.push(taxLevel);
      }
      taxLevel.totalNetAmount += item.netAmount - item.discountAmount;
      taxLevel.totalTaxAmount += item.taxAmount;
    }
  }

  const taxPdfDefinitions = taxLevels.map(taxPdfDefinition);

  const dd = {
    // header: {
    //   text: 'Račun 20-0001',
    //   alignment: 'center',
    //   fontSize: 10,
    // },
    footer: {
      text: data.invoice.footerMsg,
      alignment: 'center',
      fontSize: 10,
    },
    content: [
      {
        margin: [0, 0, 0, 30],
        columns: [
          {
            width: '*',
            stack: [
              data.invoice.client.fullName,
              data.invoice.client.address,
              data.invoice.client.postalCode +
                ' ' +
                data.invoice.client.postalOffice,
            ],
            fontSize: 18,
            bold: true,
            margin: [20, 120, 0, 0],
          },
          {
            width: 200,
            stack: [
              {
                stack: [
                  data.invoice.company.fullName,
                  data.invoice.company.address,
                  data.invoice.company.postalCode +
                    ' ' +
                    data.invoice.company.postalOffice,
                ],
                fontSize: 18,
              },
              '\n',
              data.invoice.company.regNo
                ? 'Matična številka: ' + data.invoice.company.regNo
                : '',
              (data.invoice.company.isTaxPayer
                ? 'ID za DDV: SI'
                : 'Davčna številka: ') + data.invoice.company.taxId,
              '\n',
              'TRR: ' + data.invoice.company.bankTRR,
              'BIC: ' + data.invoice.company.bankBIC,
              data.invoice.company.bankName
                ? 'Banka: ' + data.invoice.company.bankName
                : '',
            ],
          },
        ],
      },
      {
        text: '\n',
      },
      {
        columns: [
          {
            width: '*',
            stack: [
              data.invoice.client.isTaxEligible
                ? data.invoice.client.isTaxPayer
                  ? 'ID za DDV kupca: SI' + data.invoice.client.taxId
                  : 'Davčna številka kupca: ' + data.invoice.client.taxId
                : '',
              data.invoice.client.isTaxEligible
                ? 'Kupec ' +
                  (data.invoice.client.isTaxPayer ? 'JE' : 'NI') +
                  ' davčni zavezanec'
                : '',
            ],
          },
          {
            width: 200,
            table: {
              headerRows: 1,
              widths: ['*', '*'],
              body: [
                [
                  { text: invoiceName, bold: true, fontSize: 14 },
                  { text: data.invoice.accNo, bold: true, fontSize: 14 },
                ],
                [
                  data.invoice.authorLocation + ', dne',
                  data.datePipe.transform(
                    data.invoice.validFrom,
                    data.dateFormat
                  ),
                ],
                [
                  'Rok plačila',
                  data.datePipe.transform(
                    data.invoice.validTo,
                    data.dateFormat
                  ),
                ],
              ],
            },
          },
        ],
      },
      {
        text: '\n',
      },
      {
        text: data.invoice.headerMsg ? data.invoice.headerMsg + '\n' : '',
      },
      {
        text: data.invoice.supply
          ? 'Rok dobave oz izvršitve: ' +
            data.datePipe.transform(data.invoice.supplyFrom, data.dateFormat) +
            '-' +
            data.datePipe.transform(data.invoice.supplyTo, data.dateFormat) +
            '\n'
          : '',
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [30, '*', 40, 40, 40, 35, 35, 50],
          body: [
            [
              { text: 'Šifra', style: 'th' },
              { text: 'Naziv', style: 'th' },
              { text: 'Količina', style: 'thRight' },
              { text: 'Enota', style: 'th' },
              { text: 'Cena', style: 'thRight' },
              { text: 'Rabat%', style: 'thRight' },
              { text: 'DDV%', style: 'thRight' },
              { text: 'Vrednost', style: 'thRight' },
            ],
            ...itemPdfDefinitions,
            [
              {},
              { text: 'SKUPAJ brez DDV', colSpan: 5 },
              {},
              {},
              {},
              {},
              {
                text: data.decimalPipe.transform(
                  data.invoice.netAmount - data.invoice.discountAmount,
                  data.decimalFormat
                ),
                alignment: 'right',
                colSpan: 2,
              },
              {},
            ],
            ...taxPdfDefinitions,
            [
              {},
              {
                text: 'SKUPAJ ZA PLAČILO EUR',
                bold: true,
                colSpan: 5,
              },
              {},
              {},
              {},
              {},
              {
                text: data.decimalPipe.transform(
                  data.invoice.grossAmount,
                  data.decimalFormat
                ),
                bold: true,
                alignment: 'right',
                colSpan: 2,
              },
              {},
            ],
            [
              {},
              {
                colSpan: 7,
                stack: [
                  '\n',
                  {
                    text:
                      'Pri plačilu se sklicujte na številko 00 ' +
                      data.invoice.accNo,
                    bold: true,
                  },
                  '\n',
                  data.invoice.contentMsg || '',
                ],
              },
              {},
              {},
              {},
              {},
              {},
              {},
            ],
          ],
        },
      },
      {
        text: '\n\n\n',
      },
      {
        columns: [
          {
            text: '',
            width: '*',
          },
          {
            width: 200,
            text: 'Fakturiral/a:\n' + data.invoice.authorName,
          },
        ],
      },
    ],
    styles: {
      th: {
        bold: true,
        fontSize: 10,
      },
      thRight: {
        bold: true,
        alignment: 'right',
        fontSize: 10,
      },
      td: {
        fontSize: 10,
      },
      tdRight: {
        alignment: 'right',
        fontSize: 10,
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
  };
  return pdfMake.createPdf(dd);
}
