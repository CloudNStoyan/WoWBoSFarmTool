export function timeAgo(difference: number, suffix: boolean = true) {
  let result = "";

  if (difference < 60 * 1000) {
    result = `${Math.floor(difference / 1000)}s`;
  }

  //it has minutes
  if ((difference % 1000) * 3600 > 0) {
    if (Math.floor((difference / 1000 / 60) % 60) > 0) {
      let s = Math.floor((difference / 1000 / 60) % 60) == 1 ? "" : "s";
      result = `${Math.floor((difference / 1000 / 60) % 60)} minute${s} `;
    }
  }

  //it has hours
  if ((difference % 1000) * 3600 * 60 > 0) {
    if (Math.floor((difference / 1000 / 60 / 60) % 24) > 0) {
      let s = Math.floor((difference / 1000 / 60 / 60) % 24) == 1 ? "" : "s";
      result =
        `${Math.floor((difference / 1000 / 60 / 60) % 24)} hour${s}${
          result == "" ? "" : ","
        } ` + result;
    }
  }

  //it has days
  if ((difference % 1000) * 3600 * 60 * 24 > 0) {
    if (Math.floor(difference / 1000 / 60 / 60 / 24) > 0) {
      let s = Math.floor(difference / 1000 / 60 / 60 / 24) == 1 ? "" : "s";
      result =
        `${Math.floor(difference / 1000 / 60 / 60 / 24)} day${s}${
          result == "" ? "" : ","
        } ` + result;
    }
  }

  if (suffix) {
    result += " ago";
  }

  return result;
}

export function timeDiff(a: Date, b: Date) {
  return a.getTime() - b.getTime();
}
