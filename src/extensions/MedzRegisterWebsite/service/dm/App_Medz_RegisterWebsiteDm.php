<?php
defined('WEKIT_VERSION') or exit(403);
/**
 * App_Medz_RegisterWebsiteDm - 数据模型
 *
 * @author Medz Seven <lovevipdsw@vip.qq.com>
 * @copyright http://www.medz.cn
 * @license http://www.medz.cn
 */
class App_Medz_RegisterWebsiteDm extends PwBaseDm {
	protected $id;
	
	/**
	 * @return field_type
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * @param field_type $id
	 */
	public function setId($id) {
		$this->id = $id;
		return $this;
	}
	
	/**
	 * set table uid value
	 *
	 * @param mixed $uid
	 */
	public function setUid($uid) {
		$this->setId($uid);
		$this->_data['uid'] = $uid;
		return $this;
	}
	
	/**
	 * set table url value
	 *
	 * @param mixed $url
	 */
	public function setUrl($url) {
		$url = strtolower($url);
		$this->_data['url'] = $url;
		return $this;
	}
	
	/**
	 * set table md5 value
	 *
	 * @param mixed $md5
	 */
	public function setMd5($md5) {
		$this->_data['md5'] = $md5;
		return $this;
	}
	
	/**
	 * set table password value
	 *
	 * @param mixed $password
	 */
	public function setPassword($password) {
		$this->_data['password'] = $password;
		return $this;
	}
	
	/**
	 * set table login value
	 *
	 * @param mixed $login
	 */
	public function setLogin($login) {
		$this->_data['login'] = $login;
		return $this;
	}

	/* (non-PHPdoc)
	 * @see PwBaseDm::_beforeAdd()
	 */
	protected function _beforeAdd() {
		// TODO Auto-generated method stub
		//check the fields value before add
		return true;
	}

	/* (non-PHPdoc)
	 * @see PwBaseDm::_beforeUpdate()
	 */
	 protected function _beforeUpdate() {
		// TODO Auto-generated method stub
	 	//check the fields value before update
		return true;
	}
}

?>