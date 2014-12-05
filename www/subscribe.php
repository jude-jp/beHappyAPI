<?php
/**
* Cette page est appellée en Ajax pour sauvegarder un inscrit à la newsletter
* On commence par la configuration
**/
define('DBHOST','mutusql01.evxonline.net');		// MySQL Host
define('DBNAME','wego');  // Database name
define('DBLOGIN','wegoingout69');		// MySQL username
define('DBPASS','5458af28af4d1'); 			// MySQL Password

// Ici on met les messages d'erreurs, modifiés ici pour personnaliser
$m = array(
	'Impossible de se connecter à la base de donnée',
	'Votre adresse email n\'est pas valide',
	'Vous vous êtes déjà abonné à la newsletter',
	'Votre email a bien été enregistré !'
);

/**
* C'est parti !
**/
// $d sera renvoyé en json
// state : 0 => erreur ; 1 => succès !
$d = array(
	'state' => 0
); 
// MySQL connection
try{
	$db = new PDO('mysql:host='.DBHOST.';dbname='.DBNAME,DBLOGIN,DBPASS);
}catch(PDOException $e){
	$d['message'] = $m[0]; 
	die(json_encode($d)); 
}
// Where the magic happens 
$d['message'] = $m[1];
if(!empty($_POST['mail'])){
	$mail = $_POST['mail'];
	$pattern = "#^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$#"; 
	if(preg_match($pattern,$mail)){
		$req = $db->prepare('SELECT id FROM dons WHERE mail=?');
		$req->execute(array($mail));
		$data = $req->fetch(); 
		if(empty($data)){
			$req = $db->prepare('INSERT INTO dons SET mail=?');
			$req->execute(array($mail)); 
			$d = array(
				'state' => 1,
				'message' => $m[3]
			);
		}else{
			$d['message'] = $m[2];
		}
	}
}


// On renvoit les données en JSON
die(json_encode($d)); 