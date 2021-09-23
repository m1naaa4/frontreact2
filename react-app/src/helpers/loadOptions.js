import axios from "axios";
const options = [];
for (let i = 0; i < 50; ++i) {
  options.push({
    value: i + 1,
    label: `Option ${i + 1}`
  });
}

var dd = {};



const sleep = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const optionsPerPage = 10;

const loadOptions = async (search, page) => {
  dd = {
    'search' : search,
    'page'  :page
  }
  console.log(options, search, page)
  await sleep(1000);

  let filteredOptions;
  if (!search) {
    filteredOptions = options;
  } else {
    const searchLower = search.toLowerCase();

    filteredOptions = options.filter(({ label }) =>
      label.toLowerCase().includes(searchLower)
    );
  }

  const hasMore = Math.ceil(filteredOptions.length / optionsPerPage) > page;
  const slicedOptions = filteredOptions.slice(
    (page - 1) * optionsPerPage,
    page * optionsPerPage
  );

  return {
    options: slicedOptions,
    hasMore
  };
};

axios.post(`/getusers`, dd).then(resp => {
  const optionss = resp.data.users;
  const hasMoree  = optionss.next_page_url;
  
  console.log( resp.data)

})

export default loadOptions;
