'use strict';
const db = uniCloud.database();
const dbCmd = db.Command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event);
	let res = await db.collection('Grade9_One_Words').where({
		unit:Number(event.unitId)
	}).get();
	//返回数据给客户端
	return res
};
