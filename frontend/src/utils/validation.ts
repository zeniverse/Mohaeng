import { IPlacesForm } from "./../interfaces/Course.type";
export function validateTitle(title: string): boolean {
  const MIN_LENGTH = 4;
  const MAX_LENGTH = 20;

  if (MIN_LENGTH <= title.length && MAX_LENGTH >= title.length) {
    return true;
  }

  return false;
}

export function validateContent(content: string): boolean {
  const MIN_LENGTH = 10;
  const MAX_LENGTH = 200;

  if (MIN_LENGTH <= content.length && MAX_LENGTH > content.length) {
    return true;
  }

  return false;
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
