<?php
if(isset($_POST) && isset($_GET['action']) && $_GET['action'] == 'send')
{
    require_once('../conf/config.php');
    $name = htmlspecialchars($_POST['name']);
    if(empty($name)) {
        $name = "Anonymous";
    }
    $score = intval(htmlspecialchars($_POST['score']));
    $stage = intval(htmlspecialchars($_POST['stage']));
    $ip = $_SERVER['REMOTE_ADDR'];
    
    if(!empty($score) && !empty($stage)) {
        $req = "INSERT INTO simon(name, score, stage, date, ip) VALUES ('$name','$score','$stage',now(),'$ip')";
        mysqli_query($id, $req) or die($mysqli_error($id));
    }
}
if(isset($_GET['action']) && $_GET['action'] == 'get')
{
    require_once('../conf/config.php');
    $req = "SELECT name, score, stage, date FROM simon ORDER BY score desc LIMIT 10";
    $result = mysqli_query($id, $req) or die($mysqli_error($id));
    $array = [];
    $i = 0;
    while($res = mysqli_fetch_assoc($result)) {
        $array[$i] = array(
            'name' => $res['name'],
            'score' => $res['score'],
            'stage' => $res['stage'],
            'date' => $res['date']
        );
        $i++;
    }
    echo json_encode($array);
}