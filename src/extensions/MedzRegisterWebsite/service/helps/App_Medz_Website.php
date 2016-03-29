<?php
defined('WEKIT_VERSION') || exit('Forbidden');
/** ! 
 *	网站权限验证帮助库
 *	Medz Sevnen
 *	E-mail:lovevipdsw@vip.qq.com
 *	website:http://www.medz.cn
 */
class App_Medz_Website {
	
	private $type;
	private $website;
	private $code;
	private $url;
	
	public function __construct($website = '') {
		$this->website = $website;
		$this->code = md5(md5($website));
	}
	
	public function setWebsite($website) {
		$this->__construct($website);
		return $this;
	}
	
	public function setType($type) {
		$this->type = $type;
		return $this;
	}
	
	public function exec() {
		$this->url = $this->getUrl();
		switch($this->type) {
			case 'file':
				return $this->file();
				break;
			case 'meta':
				return $this->meta();
				break;
			default:
				return false;
		}
	}
	
	private function meta() {
		$tags = @get_meta_tags($this->url);
		$code = $tags['medz_reg'];
		if($code == $this->code) {
			return $code;
		}
		return false;
	}
	
	private function file() {
		$code = @file_get_contents($this->url);
		if($code == $this->code) {
			return $code;
		}
		return false;
	}
	
	private function getUrl() {
		$url = "http://" . $this->website . '/';
		if($this->type == 'file') {
			$url .= 'medz-reg-v.json';
		}
		return $url;
	}
	
}
