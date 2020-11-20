import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/integral-statictis/class/${data.classId}/week/${data.week}`,
    method: 'get',
    params: {
        pindex: data.pindex,
        number: data.number,
        target: "integral",
    }
  })
}

export function getGradeOption() {
    return request({
      url: '/class/grade/all',
      method: 'get',
    })
}
