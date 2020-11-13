import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/evaluation/declare/subject/${data.subject}`,
    method: 'get',
    params: {
        pindex: data.pindex,
        number: data.number,
    }
  })
}

export function getOption() {
    return request({
      url: '/api/teacher/teach/subject',
      method: 'get',
    })
}