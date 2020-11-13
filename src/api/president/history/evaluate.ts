import request from '/@/utils/request'

export function getData(data) {
  const url =  data.keyword ? 
    `/api/evaluation/teacher/week/${data.week}/class/${data.classId}/search/${data.keyword}` : 
    `/api/evaluation/teacher/week/${data.week}/class/${data.classId}`
  return request({
    method: 'get',
    url,
    params: {
        pindex: data.pindex,
        number: data.number,
    }
  })
}

export function getOption() {
    return request({
      url: '/api/class/all',
      method: 'get',
    })
}