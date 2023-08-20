export async function getCountries() {
  try {
    const fetching = await fetch("https://restcountries.com/v3.1/all");
    const data = await fetching.json();
    const dataCountries = data.map((el) => {
      return {
        name: el.name.common,
        flag: el.flags.svg,
      };
    });


    return { dataCountries };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
