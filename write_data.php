
<?php
$post_data = json_decode(file_get_contents('php://input'), true); // the directory "data" must be writable by the server 
$name = "C:\Users\cdickson\Documents\Phd_local".$post_data['filename'].".csv";
$data = $post_data['filedata'];
// write the file to disk
file_put_contents($name, $data);
?>
