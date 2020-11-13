import request from '/@/utils/request'

export function getData(data) {
  return request({
    method: 'get',
    url: `/test/honor/weekly/class/${data.classId}/week/${data.week}/type/${data.type}`,
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

export function getTypeOption() {
    return request({
      url: '/api/honor/content',
      method: 'get',
    })
}

// https://qcpj.bnuz.edu.cn