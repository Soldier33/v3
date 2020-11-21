import request from '/@/utils/request'

export function getData(data) {
  return request({
    url: `/api/league`,
    method: 'get',
    params: {
        pindex: data.pindex,
        number: data.number,
    }
  })
}
