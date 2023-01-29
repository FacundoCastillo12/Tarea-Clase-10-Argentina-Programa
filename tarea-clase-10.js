//Simon Dice;
let secuenciaJugador = [];
let secuenciaMaquina = [];
let nivel = 0;

avisoInicioJugar();
bloquerInputUsuario();

document.querySelector('#iniciar').onclick = iniciarJuegoEligiendoDificultad;
function iniciarJuegoEligiendoDificultad() {
	const $facil = document.querySelector('#facil');
	const $dificil = document.querySelector('#dificil');
	if ($facil.checked) {
		iniciarJuego();
	} else if ($dificil.checked) {
		iniciarJuego();
		agregarCuadradoPurpuraYNegro();
	} else {
		avisoElegirDificultad();
	}
}
document.querySelector('#reiniciar-dificultad').onclick = function() {
	avisoInicioJugar();
	bloquerInputUsuario();
	reiniciarJuego();
}
function iniciarJuego() {
	reiniciarJuego();
	bloquearDificultadUsuario();
	manejarRonda();
}

function manejarRonda(tiempo) {
	actualizarEstado('Es el turno de la maquina!');
	bloquerInputUsuario();

	const $nuevoCuadro = obtenerCuadradoAleatorio();
	secuenciaMaquina.push($nuevoCuadro);

	turnoMaquina();
	turnoJugador();

	secuenciaJugador = [];
	nivel++;
	actualizarNivel(nivel);
}
function reiniciarJuego() {
	secuenciaJugador = [];
	secuenciaMaquina = [];
	nivel = 0;
	quitarBloqueoDificultadUsuario();
	borrarCuadradosNuevos();
}

function turnoMaquina() {
	const $facil = document.querySelector('#facil');
	const $dificil = document.querySelector('#dificil');
	if ($facil.checked) {
		secuenciaMaquina.forEach(function ($cuadro, index) {
			const RETRASO_MS = (index + 1) * 1000;
			setTimeout(function () {
				resaltarCuadro($cuadro);
			}, RETRASO_MS);
		});
	} else if ($dificil.checked) {
		secuenciaMaquina.forEach(function ($cuadro, index) {
			const RETRASO_MS = (index + 1) * 500;
			setTimeout(function () {
				resaltarCuadro($cuadro);
			}, RETRASO_MS);
		});
	}
}
function turnoJugador() {
	const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;
	setTimeout(function () {
		actualizarEstado('Es el turno del jugador!');
		desbloquearInputUsuario();
	}, RETRASO_TURNO_JUGADOR);
}

function resaltarCuadro($cuadro) {
	$cuadro.style.opacity = 1;
	setTimeout(function () {
		$cuadro.style.opacity = 0.5;
	}, 500);
}
function actualizarNivel(nivel) {
	document.querySelector('#nivel').textContent = nivel;
}

function actualizarEstado(turno){
	const $actualizarTurnoJugador = document.querySelector('#div-estado');
    $actualizarTurnoJugador.textContent = `${turno}`;
    restablecerAviso();
}
function bloquerInputUsuario() {
	document.querySelectorAll('.cuadrado').forEach(function ($cuadro) {
		$cuadro.onclick = function () {};
	});
}
function desbloquearInputUsuario() {
	document.querySelectorAll('.cuadrado').forEach(function ($cuadro) {
		$cuadro.onclick = manejarInputUsuario;
	});
}
function bloquearDificultadUsuario() {
	document.querySelectorAll('.dificultad-radio').forEach(function ($radio) {
		$radio.disabled = true;
	});
}
function quitarBloqueoDificultadUsuario() {
	document.querySelectorAll('.dificultad-radio').forEach(function ($radio) {
		$radio.disabled = false;
	});
}
function usuarioPierde() {
	bloquerInputUsuario();
	const $actualizarEstadoPerder = document.querySelector('#div-estado');
	$actualizarEstadoPerder.textContent = 'Has perdido. Vuelve a intentarlo!';
	$actualizarEstadoPerder.classList.remove('alert-primary');
	$actualizarEstadoPerder.classList.add('alert-danger');
	reiniciarJuego();
}
function avisoInicioJugar() {
	const $avisoInicioJugar = document.querySelector('#div-estado');
	$avisoInicioJugar.textContent = 'Toca "iniciar juego" para comenzar a jugar!';
	$avisoInicioJugar.classList.remove('alert-danger');
	$avisoInicioJugar.classList.add('alert-primary');
}
function avisoElegirDificultad() {
	const $avisoElegirDificultad = document.querySelector('#div-estado');
	$avisoElegirDificultad.textContent = 'Debes elegir dificultad!';
	$avisoElegirDificultad.classList.remove('alert-primary');
	$avisoElegirDificultad.classList.add('alert-danger');
	reiniciarJuego();
}
function restablecerAviso() {
	const $restablecerAviso = document.querySelector('#div-estado');
	$restablecerAviso.classList.remove('alert-danger');
	$restablecerAviso.classList.add('alert-primary');
}


function obtenerCuadradoAleatorio() {
	const $cuadros = document.querySelectorAll('.cuadrado');
	const indice = Math.floor(Math.random() * $cuadros.length);
	return $cuadros[indice];
}
function manejarInputUsuario(e) {
	const $cuadro = e.target;
	resaltarCuadro($cuadro);
	secuenciaJugador.push($cuadro);
	const $cuadroMaquina = secuenciaMaquina[secuenciaJugador.length - 1];
	if ($cuadro.id !== $cuadroMaquina.id) {
		usuarioPierde();
		return;
	}
	if (secuenciaJugador.length === secuenciaMaquina.length) {
		bloquerInputUsuario();
		setTimeout(manejarRonda, 1000);
	}
}

function agregarCuadradoPurpuraYNegro() {
	crearCuadradoPurpura();
	crearCuadradoNegro();
}
function crearCuadradoPurpura() {
	const $divPrimeraFila = document.querySelector('#primera-fila');
	const $div1 = document.createElement('div');
	$div1.classList.add('col-sm-6');
	$div1.classList.add('mb-3');
	$div1.classList.add('nuevos');
	const $botonCuadro5 = document.createElement('button');
	$botonCuadro5.id = 'cuadrado5';
	$botonCuadro5.className = 'cuadrado';
	$botonCuadro5.textContent = 'Purpura';

	$div1.appendChild($botonCuadro5);
	$divPrimeraFila.appendChild($div1);
}
function crearCuadradoNegro() {
	const $divPrimeraFila = document.querySelector('#segunda-fila');
	const $div2 = document.createElement('div');
	$div2.classList.add('col-sm-6');
	$div2.classList.add('mb-3');
	$div2.classList.add('nuevos');
	const $botonCuadro5 = document.createElement('button');
	$botonCuadro5.id = 'cuadrado6';
	$botonCuadro5.className = 'cuadrado';
	$botonCuadro5.textContent = 'Negro';

	$div2.appendChild($botonCuadro5);
	$divPrimeraFila.appendChild($div2);
}
function borrarCuadradosNuevos() {
	const $divNuevo = document.querySelectorAll('.nuevos');
	for (let i = 0; i < $divNuevo.length; i++) {
		$divNuevo[i].remove();
	}
}

