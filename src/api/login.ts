import request from '/@/utils/request'
import hex_sha1 from '/@/utils/sha1'
import md5 from "js-md5";

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

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    params: {
      teacherName: data.username,
      password: hex_sha1(md5(data.password)),
      provinceId: data.provinceId,
      cityId: data.cityId,
      schoolId: data.schoolId,
      role: data.role
    }
  })
}