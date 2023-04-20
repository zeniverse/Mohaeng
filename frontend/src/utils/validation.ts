import { IPlacesForm } from "./../interfaces/Course.type";
export function validateTitle(title: string): string {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 15;

  if (title.length < MIN_LENGTH || title.length > MAX_LENGTH) {
    console.log("안맞음");
    return "3자 이상 혹은 15자 이내로 작성해주세요.";
  }

  return "";
}
export function validateContent(content: string): string {
  const MIN_LENGTH = 10;
  const MAX_LENGTH = 300;

  if (content.length < MIN_LENGTH || content.length > MAX_LENGTH) {
    return "10자 이상 혹은 300자 이내로 작성해주세요.";
  }

  return "";
}

export function validateStartEndDate(
  startDate: string,
  endDate: string
): string {
  console.log(startDate);
  console.log(endDate);
  if (!startDate || !endDate) {
    return "시작일과 종료일을 입력해주세요.";
  }

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // startDate와 endDate가 유효한 날짜인지 검사합니다.
  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    return "유효하지 않은 날짜입니다.";
  }

  // startDate가 endDate 이전이 아니면 유효하지 않은 값입니다.
  if (startDateObj > endDateObj) {
    return "출발 일자가 유효하지 않습니다.";
  }

  return "";
}

export function validateCourseDays(courseDays: string): string {
  // courseDays가 선택되지 않았으면 유효하지 않은 값입니다.
  if (!courseDays) {
    return "소요일자를 선택해주세요";
  }

  return "";
}
export function validateEegion(region: string): boolean {
  // courseDays가 선택되지 않았으면 유효하지 않은 값입니다.
  if (!region) {
    return false;
  }

  return true;
}

export function validatePlaces(places: IPlacesForm[]): boolean {
  // places 배열에 요소가 없으면 유효하지 않은 값입니다.
  if (places.length === 0) {
    return false;
  }

  return true;
}
