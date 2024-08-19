interface IUser {
  id: string;
  email: string;
  role: string;
  displayName: string;
  photoURL: string;
  exists?: any;
}

type IFindById = IUser & DocumentSnapshot<DocumentData, DocumentData>;
