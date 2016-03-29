<?php
defined('WEKIT_VERSION') || exit('Forbidden');
/** ! 
 *	用户验证网站，更新，添加，删除
 *	Medz Sevnen
 *	E-mail:lovevipdsw@vip.qq.com
 *	website:http://www.medz.cn
 */
class App_Medz_Db {
	
	public $dm;
	public $uid;
	public $url;
	public $md5;
	public $passord;
	public $login;
	
	public function __construct() {
		$this->dm = $this->getDm();
	}
	
	public function setUid($uid) {
		$this->uid = $uid;
		$this->dm->setUid($this->uid);
		return $this;
	}
	
	public function setUrl($url) {
		$this->url = $url;
		$this->md5 = md5(md5($this->url));
		$this->dm->setUrl($this->url);
		$this->dm->setMd5($this->md5);
		return $this;
	}
	
	public function setPassword($password) {
		$this->password = $password;
		$this->dm->setPassword($this->password);
		return $this;
	}
	
	public function setlogin($login) {
		$this->login = $login;
		$this->dm->setLogin($this->login);
		return $this;
	}
	
	public function get() {
		return $this->getServer()->get($this->uid);
	}
	
	public function getByUrl() {
		return $this->getServer()->getByUrl($this->url);
	}
	
	public function add() {
		return $this->getServer()->add($this->dm);
	}
	
	public function update() {
		return $this->getServer()->update($this->dm);
	}
	
	public function delete() {
		return $this->getServer()->delete($this->uid);
	}
	
	protected function getDm() {
		Wind::import('EXT:MedzRegisterWebsite.service.dm.App_Medz_RegisterWebsiteDm');
		return new App_Medz_RegisterWebsiteDm();
	}
	
	protected function getServer() {
		return Wekit::load('EXT:MedzRegisterWebsite.service.App_Medz_RegisterWebsite');
	}
	
}
 