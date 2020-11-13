import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/evaluation/notice/week/${data.week}/class/${data.classId}/type/${data.type}`,
    method: 'get',
  })
}

export function getOption() {
    return request({
      url: '/api/class/all',
      method: 'get',
    })
}