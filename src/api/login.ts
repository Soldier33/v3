import request from '/@/utils/request'

export function getProvince() {
  return request({
    url: '/api/school/province',
    method: 'get',
  })
}

export function getCity(data) {
  return request({
    url: `/api/school/province/${data}/city`,
    method: 'get',
  })
}


export function getSchool(provinceId, cityId) {
  return request({
    url: `/api/school/province/${provinceId}/city/${cityId}/school`,
    method: 'get',
  })
}