import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/content/template/${data.species}/${data.type}`,
    method: 'get',
    params: {
        grade: data.grade,
        target: data.target,
    }
  })
}

export function getGradeOption() {
    return request({
      url: '/api/class/all',
      method: 'get',
    })
}

export function getTypeOption() {
  return request({
    url: '/api/content/type',
    method: 'get',
  })
}



export function getSubjectOption() {
  return request({
    url: '/api/content/subject',
    method: 'get',
  })
}