interface IRetailVisit {
  fullName: string;
  phoneNumber: string;
  officeLocation: string;
  retailerName: string;
  retailerPhoneNumber: string;
  retailerAddress?: string;
  visitDate?: string;
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
