interface IDateProvider {
  compareInHours: (startDate: Date, endDate: Date) => number;
  convertToUTC: (date: Date) => string;
  dateNow: () => Date;
  compareInDays: (startDate: Date, endDate: Date) => number;
  addDays: (days: number) => Date;
  addHours: (hours: number) => Date;
  compareBefore: (firstDate: Date, secondDate: Date) => boolean;
}

export { IDateProvider };
