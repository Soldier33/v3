import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/student/class/${data.classId}`,
    method: 'get',
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
