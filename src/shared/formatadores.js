// Formata os minutos acumulados acima de 60 min para horas
export const formatarTempoAcumulado = (minutosTotais) => {
  let horas;
  let minutos;
  // verifica se os minutos passaram ou não dos 60min
  if (minutosTotais < 60) {
    return `${minutosTotais} min`;
  } else if (minutosTotais >= 60) {
    horas = Math.floor(minutosTotais / 60);
    minutos = minutosTotais % 60;
    // verifica se o resto é zero antes de decidir qual vai retonar
    if (minutos === 0) {
      return `${horas}h`;
    }
    return `${horas}h, ${minutos}min`;
  }
  return;
};