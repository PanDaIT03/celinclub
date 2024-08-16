interface IRetailVisit {
  fullName: string;
  phoneNumber: string;
  officeLocation: string;
  retailerName: string;
  retailerPhoneNumber: string;
  retailerAddress?: string;
  visitDate: string;
  stimulusProductIds: string[];
  feedback: string;
  upload: { file: any; fileList: UploadFile<any>[] };
}
