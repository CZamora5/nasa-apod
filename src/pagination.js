function activatePaginationButtons() {
  return;
}

export function showPagination() {
  const paginationTemplate = document.getElementById('pagination-template').content;
  const pagination = document.importNode(paginationTemplate, true);
  document.body.appendChild(pagination);
}

export function hidePagination() {
  const pagination = document.querySelector('.pagination-wrapper');
  if (pagination) pagination.remove();
}