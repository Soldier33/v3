import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/teacher/all`,
    method: 'get',
    params: {
        pindex: data.pindex,
        number: data.number,
        teacherName: data.keyword,
    }
  })
}
