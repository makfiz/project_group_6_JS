import { ApiServise } from './apiServise';

const newApi = new ApiServise();
console.log(newApi.totalPage);

export function pagination(ref) {
  ref.addEventListener('click', somefunc);
}
function nextPage() {}
function previousPage() {}
function setPage() {}
