<?php
Wind::import('SRV:user.srv.register.do.PwRegisterDoBase');
class App_Medz_RegisterWebsite_Do extends PwRegisterDoBase {
	
	public $url;
	
	/**
	 * 构造函数
	 *
	 * @param PwRegisterService $bp
	 */
	public function __construct(PwRegisterService $bp, $url = '') {
		parent::__construct($bp);
		$this->url = $url;
	}
	
	/**
	 * 注册必须实现的接口
	 *
	 * @param PwUserInfoDm $userDm
	 * @return true|PwError
	 */
	public function beforeRegister(PwUserInfoDm $userDm) {
		if(!WindValidator::isRequired($this->url)) {
			return new PwError("域名不能为空");
		} else if(!$this->isUrl($this->url)) {
			return new PwError("“" . $this->url . "”格式不正确！");
		} else {
			$d = $this->MedzDb();
			$d->setUrl($this->url);
			$d = $d->getByUrl();
			if(!empty($d) || $d['url'] == $this->url) {
				return new PwError("“" . $this->url . "”该域名已经存在，请重新选择域名注册！");
			} else {
				$websiteServer = $this->MedzWebsite($this->url);
				$websiteServer->setType('file');
				if(!$websiteServer->exec()) {
					$websiteServer->setType('meta');
					if($websiteServer->exec()) {
						return true;
					} else {
						return new PwError("对不起，网站检验失败，请回到注册页面重新校验！");
					}
				} else {
					return true;
				}
			}
		}
		return new PwError("系统发生错误！");
	}
	
	/** 
	 * 在注册结束之后执行
	 * 
	 * @param PwUserInfoDm $userDm
	 * @return true|PwError
	 */
	public function afterRegister(PwUserInfoDm $userDm) {
		if (!$this->url || !$userDm->uid) {
			return new PwError("url或uid不能为空");
		}
		if(!$this->url) {
			return new PwError("网站域名不能为空！");
		} else if(!$userDm->uid) {
			return false;
		}
		$db = $this->MedzDb();
		$db->setUid($userDm->uid);
		$db->setUrl($this->url);
		$db->add();
		return true;
	}
	
	private static function isUrl($string) {
		return 0 < preg_match('/^(?:(?:[\w-]+\.)+[\w-]+(?:[\w-]*)?)$/', $string);
	}
	
	private function MedzDb() {
		return Wekit::load('EXT:MedzRegisterWebsite.service.helps.App_Medz_Db');
	}
	
	private function MedzWebsite($website = '') {
		Wind::import('EXT:MedzRegisterWebsite.service.helps.App_Medz_Website');
		return new App_Medz_Website($website);
	}
	
}