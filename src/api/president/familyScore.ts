import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: '/api/integral-statictis/family',
    method: 'get',
    params: {
        pindex: data.pindex,
        number: data.number,
        keyword: data.keyword,
        classId: data.classId,
    }
  })
}

export function getOption() {
    return request({
      url: '/api/class/all',
      method: 'get',
    })
}