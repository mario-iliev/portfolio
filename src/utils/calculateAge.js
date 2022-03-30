function calculateAge(dateString = "01/01/2000") {
  const birthday = +new Date(dateString);

  return ~~((Date.now() - birthday) / 31557600000);
}

export default calculateAge;
