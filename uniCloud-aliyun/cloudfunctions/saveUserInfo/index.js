'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event._id)
	let e_id= event._id.toString();
	let collection = db.collection('regUsers');
	let s_id = await collection.where({
		_id: e_id
	}).get();
	let res = '';
	if (s_id.data != null) {
		res = await collection.doc(e_id).set({
			openid:event.openid,
			nickName:event.nickName,
			phonNum:event.phonNum,
			avatarUrl:event.avatarUrl
		});
		console.log("更新")
	} else {
		res = await collection.add(event)
		console.log('保存')
	}
	//返回数据给客户端
	return res;
};