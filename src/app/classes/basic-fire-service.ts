import { QueryFn } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FireDataInterface } from '../interfaces/fire-data-interface';
import { SystemService } from '../services/system.service';

export class BasicFireService<T extends FireDataInterface<T>> {
  constructor(private system: SystemService, private collectionName: string) {}

  async create(data: T) {
    const user = await this.system.getCurrentUser();
    return this.system.store.collection(this.collectionName).add({
      ...data.prepare(),
      userId: user.uid,
      dateCreated: new Date(),
    });
  }

  async read(c: { new (o: any): T }, fn?: QueryFn) {
    const user = await this.system.getCurrentUser();
    const onlyActive: QueryFn = (ref) => {
      let query = (fn != null ? fn(ref) : ref)
        .where(`userId`, `==`, user.uid)
        .where(`deleted`, `==`, false);
      return query;
    };
    return this.system.store
      .collection<T>(this.collectionName, onlyActive)
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((item) => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;
            return new c({ id, ...data });
          });
        })
      );
  }

  update(data: T) {
    return this.system.store
      .collection(this.collectionName)
      .doc(data.id)
      .set({
        ...data.prepare(),
        dateUpdated: new Date(),
      });
  }

  delete(data: T) {
    return this.system.store
      .collection(this.collectionName)
      .doc(data.id)
      .set({
        ...data.prepare(),
        deleted: true,
        dateDeleted: new Date(),
      });
  }
}
