let secuenciaJugador = [];
let secuenciaMaquina = [];
let nivel = 0;

mostrarMensaje('Toca "iniciar juego" para comenzar a jugar!', true);
bloquearInputUsuario();

document.querySelector('#iniciar').onclick = validarInicioJuego;
function validarInicioJuego() {
	const $facil = document.querySelector('#facil');
	const $dificil = document.querySelector('#dificil');
	if (!$facil.checked && !$dificil.checked) {
		mostrarMensaje('Debe elegir una dificultad!', false);
		return '';
	}

	iniciarJuego();

	if ($dificil.checked) {
		agregarCuadradoPurpuraYNegro();
	}
}
document.querySelector('#reiniciar-dificultad').onclick = function () {
	mostrarMensaje('Toca "iniciar juego" para comenzar a jugar!', true);
	bloquearInputUsuario();
	reiniciarJuego();
};
function iniciarJuego() {
	reiniciarJuego();
	deshabilitarBotonIniciar();
	bloquearDificultadUsuario();
	manejarRonda();
}

function manejarRonda(tiempo) {
	actualizarEstado('Es el turno de la maquina!');
	bloquearInputUsuario();

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
	habilitarBotonIniciar();
	desbloquearDificultadUsuario();
	borrarCuadradosNuevos();
}

function turnoMaquina() {
	secuenciaMaquina.forEach(function ($cuadro, index) {
		const $facil = document.querySelector('#facil');
		let retrasoMs;
		if ($facil.checked) {
			retrasoMs = (index + 1) * 1000;
		} else {
			retrasoMs = (index + 1) * 600;
		}
		setTimeout(function () {
			resaltarCuadro($cuadro);
		}, retrasoMs);
	});
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

function actualizarEstado(turno) {
	const $actualizarTurnoJugador = document.querySelector('#div-estado');
	$actualizarTurnoJugador.textContent = `${turno}`;
	restablecerAviso();
}
function bloquearInputUsuario() {
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
function desbloquearDificultadUsuario() {
	document.querySelectorAll('.dificultad-radio').forEach(function ($radio) {
		$radio.disabled = false;
	});
}
function deshabilitarBotonIniciar() {
	const $deshabilitar = document.querySelector('#iniciar');
	$deshabilitar.disabled = true;
}
function habilitarBotonIniciar() {
	const $deshabilitar = document.querySelector('#iniciar');
	$deshabilitar.disabled = false;
}

function mostrarMensaje(mensaje, esError) {
	const $mostrarMensaje = document.querySelector('#div-estado');
	$mostrarMensaje.textContent = mensaje;
	if (esError) {
		$mostrarMensaje.classList.remove('alert-danger');
		$mostrarMensaje.classList.add('alert-primary');
	} else {
		$mostrarMensaje.classList.remove('alert-primary');
		$mostrarMensaje.classList.add('alert-danger');
	}
}

function usuarioPierde() {
	bloquearInputUsuario();
	const $actualizarEstadoPerder = document.querySelector('#div-estado');
	$actualizarEstadoPerder.textContent = 'Has perdido. Vuelve a intentarlo!';
	$actualizarEstadoPerder.classList.remove('alert-primary');
	$actualizarEstadoPerder.classList.add('alert-danger');
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
		bloquearInputUsuario();
		setTimeout(manejarRonda, 1000);
	}
}

function agregarCuadradoPurpuraYNegro() {
	const $divPrimeraFila = document.querySelector('#primera-fila');
	const $divSegundaFila = document.querySelector('#segunda-fila');
	const $div1 = document.createElement('div');
	const $div2 = document.createElement('div');
	$div1.classList.add('col-sm-6');
	$div1.classList.add('mb-3');
	$div1.classList.add('nuevos');
	$div2.classList.add('col-sm-6');
	$div2.classList.add('mb-3');
	$div2.classList.add('nuevos');
	const $botonCuadro5 = document.createElement('button');
	const $botonCuadro6 = document.createElement('button');
	$botonCuadro5.id = 'cuadrado5';
	$botonCuadro5.className = 'cuadrado';
	$botonCuadro5.textContent = 'Purpura';
	$botonCuadro6.id = 'cuadrado6';
	$botonCuadro6.className = 'cuadrado';
	$botonCuadro6.textContent = 'Negro';

	$div1.appendChild($botonCuadro5);
	$div2.appendChild($botonCuadro6);
	$divPrimeraFila.appendChild($div1);
	$divSegundaFila.appendChild($div2);
}

function borrarCuadradosNuevos() {
	const $divNuevo = document.querySelectorAll('.nuevos');
	for (let i = 0; i < $divNuevo.length; i++) {
		$divNuevo[i].remove();
	}
}
