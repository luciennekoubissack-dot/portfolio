<?php
// Configuration
$to_email = "votre.email@exemple.com"; // Remplacez par votre vraie adresse email
$subject_prefix = "[Portfolio Contact] ";

// Headers pour éviter les spams
$headers = array(
    'MIME-Version' => '1.0',
    'Content-type' => 'text/html; charset=UTF-8',
    'From' => 'noreply@votredomaine.com',
    'Reply-To' => '',
    'X-Mailer' => 'PHP/' . phpversion()
);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération et nettoyage des données
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $company = filter_var(trim($_POST["company"]), FILTER_SANITIZE_STRING);
    $subject = filter_var(trim($_POST["subject"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);
    
    // Validation
    $errors = array();
    
    if (empty($name)) {
        $errors[] = "Le nom est requis.";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Une adresse email valide est requise.";
    }
    
    if (empty($subject)) {
        $errors[] = "Le sujet est requis.";
    }
    
    if (empty($message)) {
        $errors[] = "Le message est requis.";
    }
    
    // Si pas d'erreurs, envoyer l'email
    if (empty($errors)) {
        $headers['Reply-To'] = $email;
        
        $email_subject = $subject_prefix . $subject;
        
        $email_body = "
        <html>
        <head>
            <title>Nouveau message depuis le portfolio</title>
        </head>
        <body>
            <h2>Nouveau message de contact</h2>
            <p><strong>Nom:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Entreprise:</strong> " . ($company ? $company : "Non spécifiée") . "</p>
            <p><strong>Sujet:</strong> {$subject}</p>
            <p><strong>Message:</strong></p>
            <div style='background: #f5f5f5; padding: 15px; border-left: 4px solid #a66c84;'>
                " . nl2br(htmlspecialchars($message)) . "
            </div>
            <hr>
            <p><small>Ce message a été envoyé depuis votre portfolio le " . date('d/m/Y à H:i') . "</small></p>
        </body>
        </html>";
        
        $header_string = "";
        foreach ($headers as $key => $value) {
            $header_string .= $key . ": " . $value . "\r\n";
        }
        
        if (mail($to_email, $email_subject, $email_body, $header_string)) {
            http_response_code(200);
            echo json_encode(array("status" => "success", "message" => "Message envoyé avec succès!"));
        } else {
            http_response_code(500);
            echo json_encode(array("status" => "error", "message" => "Erreur lors de l'envoi du message."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("status" => "error", "message" => implode(" ", $errors)));
    }
} else {
    http_response_code(405);
    echo json_encode(array("status" => "error", "message" => "Méthode non autorisée."));
}
?>