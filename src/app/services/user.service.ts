import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  addUser(user: User) {
    const userRef = collection(this.firestore, 'Users');
    return addDoc(userRef, { ...user });
  }

  getUsers(): Observable<User[]> {
    const userRef = collection(this.firestore, 'Users');
    return collectionData(userRef, {idField: 'customIdName'}) as Observable<User[]>;
  }

  getUser(customIdName: string): Observable<User> {
    const userDocRef = doc(this.firestore, `Users/${customIdName}`);
    return from(getDoc(userDocRef).then(docSnap => docSnap.data() as User));
  }
}