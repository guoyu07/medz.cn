<?php
defined('WEKIT_VERSION') or exit(403);
Wind::import('EXT:MedzRegisterWebsite.service.dm.App_Medz_RegisterWebsiteDm');
/**
 * App_Medz_RegisterWebsite - 数据服务接口
 *
 * @author Medz Seven <lovevipdsw@vip.qq.com>
 * @copyright http://www.medz.cn
 * @license http://www.medz.cn
 */
class App_Medz_RegisterWebsite {
	
	/**
	 * add record
	 *
	 * @param App_Medz_RegisterWebsiteDm $dm
	 * @return multitype:|Ambigous <boolean, number, string, rowCount>
	 */
	public function add(App_Medz_RegisterWebsiteDm $dm) {
		if (true !== ($r = $dm->beforeAdd())) return $r;
		return $this->_loadDao()->add($dm->getData());
	}
	
	/**
	 * update record
	 *
	 * @param App_Medz_RegisterWebsiteDm $dm
	 * @return multitype:|Ambigous <boolean, number, rowCount>
	 */
	public function update(App_Medz_RegisterWebsiteDm $dm) {
		if (true !== ($r = $dm->beforeUpdate())) return $r;
		return $this->_loadDao()->update($dm->getId(), $dm->getData());
	}
	
	/**
	 * get a record
	 *
	 * @param unknown_type $id
	 * @return Ambigous <multitype:, multitype:unknown , mixed>
	 */
	public function get($id) {
		return $this->_loadDao()->get($id);
	}
	
	/**
	 * get data by url
	 *
	 * @param unknown_type $url
	 * @return Ambigous <multitype:, multitype:unknown , mixed>
	 */
	public function getByUrl($url) {
		return $this->_loadDao()->getByUrl($url);
	}
	
	/**
	 * delete a record
	 *
	 * @param unknown_type $id
	 * @return Ambigous <number, boolean, rowCount>
	 */
	public function delete($id) {
		return $this->_loadDao()->delete($id);
	}
	
	/**
	 * @return App_Medz_RegisterWebsiteDao
	 */
	private function _loadDao() {
		return Wekit::loadDao('EXT:MedzRegisterWebsite.service.dao.App_Medz_RegisterWebsiteDao');
	}
}

?>