import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/class/all`,
    method: 'get',
    params: {
        pindex: data.pindex,
        number: data.number,
        gradeId: data.gradeId,
    }
  })
}

export function getOption() {
    return request({
      url: '/api/class/all',
      method: 'get',
    })
}
