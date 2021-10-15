import {bicValidator, bicValidatorRaw} from './bic-validator'

describe('bicValidator', () => {
  it('should validate SKB BIC', () => {
    expect(bicValidatorRaw('SKBASI2X')).toEqual(true)
  })

  it('should return false when invalid BIC is used', () => {
    expect(bicValidatorRaw('THIS IS NOT A VALID BIC')).toEqual(false)
  })
})
