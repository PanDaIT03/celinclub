import { Timestamp } from 'firebase/firestore';

interface IRetailVisit {
  fullName: string;
  phoneNumber: string;
  officeLocation: string;
  retailerName: string;
  retailerPhoneNumber: string;
  retailerAddress?: string;
  visitDate?: Timestamp | string;
  createDate?: Timestamp | string;
  createIdBy?: string;
  createNameBy?: string;
  stimulusProductIds: string[];
  feedback: string;
  upload: { file: any; fileList: UploadFile<any>[] };
}

interface IRetailVisitData {
  items: TRetailVisit[];
  pageInfo: IPageInfo;
}

type IRetailInitialState = {
  data: IRetailVisitData;
} & IInitialState;

type TRetailVisit = {
  stimulusProducts?: string;
} & IRetailVisit;

interface IPageInfo {
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
}

type IUploadRetailVisit = {
  onSuccess?: () => void;
} & IRetailVisit;
