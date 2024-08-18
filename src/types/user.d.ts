interface IUser {
  id: string;
  email: string;
  role: string;
  displayName: string;
  photoURL: string;
}

type IFindById = IUser & DocumentSnapshot<DocumentData, DocumentData>;
