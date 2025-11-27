export const removeSearchParam = (param, searchParams, router) => {
  const params = new URLSearchParams(searchParams.toString());
  // Remove the specific search param
  params.delete(param);

  // Update the URL without reloading the page
  router.push(`?${params.toString()}`, undefined, { shallow: true });
};
