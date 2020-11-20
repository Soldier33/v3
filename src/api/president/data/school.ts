import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/school/${data}`,
    method: 'get',
  })
}

export function modify(data) {
    return request({
      url: `/api/school/modify`,
      method: 'POST',
      params: {
        schoolName: data.school,
        schoolTime: data.date,
        prompt: data.tip,
        checkPrivilege: 1,
      }
    })
  }