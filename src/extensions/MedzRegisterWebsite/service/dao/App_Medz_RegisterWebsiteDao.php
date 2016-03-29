<?php
defined('WEKIT_VERSION') or exit(403);
/**
 * App_Medz_RegisterWebsiteDao - dao
 *
 * @author Medz Seven <lovevipdsw@vip.qq.com>
 * @copyright http://www.medz.cn
 * @license http://www.medz.cn
 */
class App_Medz_RegisterWebsiteDao extends PwBaseDao {
	
	/**
	 * table name
	 */
	protected $_table = 'medz_website_user';
	/**
	 * primary key
	 */
	protected $_pk = 'uid';
	/**
	 * table fields
	 */
	protected $_dataStruct = array('uid', 'url', 'md5', 'password', 'login');
	
	public function add($fields) {
		return $this->_add($fields, true);
	}
	
	public function update($id, $fields) {
		return $this->_update($id, $fields);
	}
	
	public function delete($id) {
		return $this->_delete($id);
	}
	
	public function get($id) {
		return $this->_get($id);
	}
	
	public function getByUrl($url) {
		$sql = $this->_bindSql('SELECT * FROM %s WHERE %s LIKE ?', $this->getTable(), 'url');
		$smt = $this->getConnection()->createStatement($sql);
		return $smt->queryAll(array(/* '%',  */$url/* , '%' */));
	}
	
}

?>