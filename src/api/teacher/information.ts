import request from '/@/utils/request'

export function getOption() {
  return request({
    url: '/api/class/all',
    method: 'get',
  })
}

export function getData(data) {
  return request({
    url: '/api/student/class',
    //url: '/test/gettest',
    method: 'get',
    params: {
      pindex: data.pindex,
      number: data.number,
      keyword: data.keyword,
      classId: data.classId,
    }
  })
}



