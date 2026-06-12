import { prisma } from "../../config/prisma";

// 1. Usuarios agrupados por continente
// Cuenta la cantidad de usuarios registrados por continente
// AppUser.CountryID > Country.ContinentID
export async function getUsersByContinent() {
  const result = await prisma.$queryRaw<
    { continent: string; total: bigint }[]
  >`
    SELECT c.ContinentName AS continent, COUNT(u.UserID) AS total
    FROM AppUser u
    JOIN Country co ON u.CountryID = co.CountryID
    JOIN Continent c ON co.ContinentID = c.ContinentID
    GROUP BY c.ContinentID, c.ContinentName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    continent: row.continent,
    total: Number(row.total),
  }));
}

// 2. Países con más boycotts marcados como favoritos
// Cuenta los registros de favoritos agrupados por el país del boycott
// UserFavoriteBoycott.BoycottID > Boycott.CountryID.
export async function getCountriesWithMoreFavorites() {
  const result = await prisma.$queryRaw<
    { country: string; total: bigint }[]
  >`
    SELECT co.CountryName AS country, COUNT(*) AS total
    FROM UserFavoriteBoycott uf
    JOIN Boycott b ON uf.BoycottID = b.BoycottID
    JOIN Country co ON b.CountryID = co.CountryID
    GROUP BY co.CountryID, co.CountryName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    country: row.country,
    total: Number(row.total),
  }));
}

// 3. Boycotts según el continente del creador
// Cuenta los boycotts agrupándolos por el continente del usuario que los creó
// Boycott.CreatorID > AppUser.CountryID > Country.ContinentID.
export async function getBoycottsByUserContinent() {
  const result = await prisma.$queryRaw<
    { continent: string; total: bigint }[]
  >`
    SELECT c.ContinentName AS continent, COUNT(b.BoycottID) AS total
    FROM Boycott b
    JOIN AppUser u ON b.CreatorID = u.UserID
    JOIN Country co ON u.CountryID = co.CountryID
    JOIN Continent c ON co.ContinentID = c.ContinentID
    GROUP BY c.ContinentID, c.ContinentName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    continent: row.continent,
    total: Number(row.total),
  }));
}

// 4. Boycotts por categoría de injusticia
// Calcula la cantidad y el porcentaje de boycotts para cada tipo de injusticia
// El porcentaje se calcula segun el total de boycotts registrados
export async function getBoycottsByInjusticeCategory() {
  const result = await prisma.$queryRaw<
    { category: string; total: bigint; percentage: number }[]
  >`
    SELECT 
      i.InjusticeName AS category,
      COUNT(b.BoycottID) AS total,
      ROUND(
        COUNT(b.BoycottID) * 100.0 / (SELECT COUNT(*) FROM Boycott),
        2
      ) AS percentage
    FROM Boycott b
    JOIN InjusticeType i ON b.InjusticeTypeID = i.InjusticeTypeID
    GROUP BY i.InjusticeTypeID, i.InjusticeName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    category: row.category,
    total: Number(row.total),
    percentage: Number(row.percentage),
  }));
}

// 5. Boycotts por categoría de injusticia y género
// Calcula la cantidad y el porcentaje de boycotts por tipo de injusticia considerando únicamente usuarios del género indicado
// considerando únicamente usuarios del género indicado
// El filtro se aplica mediante AppUser.GenderID.
export async function getBoycottsByInjusticeCategoryAndGender(genderId: number) {
  const result = await prisma.$queryRaw<
    { category: string; total: bigint; percentage: number }[]
  >`
    SELECT 
      i.InjusticeName AS category,
      COUNT(b.BoycottID) AS total,
      ROUND(
        COUNT(b.BoycottID) * 100.0 / (
          SELECT COUNT(*)
          FROM Boycott b2
          JOIN AppUser u2 ON b2.CreatorID = u2.UserID
          WHERE u2.GenderID = ${genderId}
        ),
        2
      ) AS percentage
    FROM Boycott b
    JOIN InjusticeType i ON b.InjusticeTypeID = i.InjusticeTypeID
    JOIN AppUser u ON b.CreatorID = u.UserID
    WHERE u.GenderID = ${genderId}
    GROUP BY i.InjusticeTypeID, i.InjusticeName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    category: row.category,
    total: Number(row.total),
    percentage: Number(row.percentage),
  }));
}

// 6. Resumen de boycotts por categoría de injusticia
// Devuelve la distribución de boycotts por categoría junto con su porcentaje
// El porcentaje se calcula respecto al total de boycotts registrados
export async function getBoycottsSummaryByInjusticeCategory() {
  const result = await prisma.$queryRaw<
    { category: string; total: bigint; percentage: number }[]
  >`
    SELECT 
      i.InjusticeName AS category,
      COUNT(b.BoycottID) AS total,
      ROUND(
        COUNT(b.BoycottID) * 100.0 / (SELECT COUNT(*) FROM Boycott),
        2
      ) AS percentage
    FROM Boycott b
    JOIN InjusticeType i ON b.InjusticeTypeID = i.InjusticeTypeID
    GROUP BY i.InjusticeTypeID, i.InjusticeName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    category: row.category,
    total: Number(row.total),
    percentage: Number(row.percentage),
  }));
}

// 7. Empresas ordenadas por cantidad de boycotts
// Cuenta cuántos boycotts están asociados a cada org
// Los resultados se ordenan de mayor a menor cantidad
export async function getCompaniesByBoycottCount() {
  const result = await prisma.$queryRaw<
    { company: string; total: bigint }[]
  >`
    SELECT e.EntityName AS company, COUNT(b.BoycottID) AS total
    FROM Boycott b
    JOIN Entity e ON b.EntityID = e.EntityID
    GROUP BY e.EntityID, e.EntityName
    ORDER BY total DESC
  `;
  return result.map((row) => ({
    company: row.company,
    total: Number(row.total),
  }));
}

// 8. Boycotts agrupados por industria
export async function getBoycottsByIndustry() {
  const result = await prisma.$queryRaw<
    { industry: string; total: bigint }[]
  >`
    SELECT i.IndustryName AS industry, COUNT(b.BoycottID) AS total
    FROM Boycott b
    JOIN Entity e ON b.EntityID = e.EntityID
    LEFT JOIN IndustryType i ON e.IndustryTypeID = i.IndustryTypeID
    WHERE i.IndustryTypeID IS NOT NULL
    GROUP BY i.IndustryTypeID, i.IndustryName
    ORDER BY total DESC
  `;
  return result.map((row) => ({
    industry: row.industry,
    total: Number(row.total),
  }));
}

// 9. Se hace el ranking de boycotts según porcentaje de aprobación
// Calcula el porcentaje de votos a favor sobre el total de votos.
// Solo considera boycotts que han recibido al menos un voto.
export async function getBoycottRankings() {
  const result = await prisma.$queryRaw<
    {
      boycottId: number;
      title: string;
      publicationDate: Date;
      company: string;
      votesInFavor: number;
      votesAgainst: number;
      avgScore: number;
    }[]
  >`
    SELECT
      b.BoycottID      AS boycottId,
      b.Title          AS title,
      b.PublicationDate AS publicationDate,
      e.EntityName     AS company,
      b.VotesInFavor   AS votesInFavor,
      b.VotesAgainst   AS votesAgainst,
      ROUND(
        b.VotesInFavor / NULLIF(b.VotesInFavor + b.VotesAgainst, 0) * 100,
        2
      ) AS avgScore
    FROM Boycott b
    JOIN Entity e ON b.EntityID = e.EntityID
    WHERE (b.VotesInFavor + b.VotesAgainst) > 0
    ORDER BY avgScore DESC
  `;
  return result.map((row) => ({
    ...row,
    boycottId: Number(row.boycottId),
    votesInFavor: Number(row.votesInFavor),
    votesAgainst: Number(row.votesAgainst),
    avgScore: Number(row.avgScore),
  }));
}

// 10. Industria líder por continente
// Obtiene la industria con mayor cantidad de boycotts en cada continente
// Boycott.CountryID > Country.ContinentID.
export async function getLeadingIndustryByContinent() {
  const result = await prisma.$queryRaw<
    { continent: string; industry: string; total: bigint }[]
  >`
    SELECT
      c.ContinentName AS continent,
      i.IndustryName AS industry,
      COUNT(b.BoycottID) AS total
    FROM Boycott b
    JOIN Country co ON b.CountryID = co.CountryID
    JOIN Continent c ON co.ContinentID = c.ContinentID
    JOIN Entity e ON b.EntityID = e.EntityID
    JOIN IndustryType i ON e.IndustryTypeID = i.IndustryTypeID
    WHERE e.IndustryTypeID IS NOT NULL
    GROUP BY c.ContinentID, c.ContinentName, i.IndustryTypeID, i.IndustryName
    HAVING COUNT(b.BoycottID) = (
      SELECT MAX(sub.cnt)
      FROM (
        SELECT COUNT(b2.BoycottID) AS cnt
        FROM Boycott b2
        JOIN Country co2 ON b2.CountryID = co2.CountryID
        JOIN Entity e2 ON b2.EntityID = e2.EntityID
        WHERE co2.ContinentID = c.ContinentID
          AND e2.IndustryTypeID IS NOT NULL
        GROUP BY e2.IndustryTypeID
      ) sub
    )
    ORDER BY c.ContinentName, total DESC
  `;

  return result.map((row) => ({
    continent: row.continent,
    industry: row.industry,
    total: Number(row.total),
  }));
}

// 11. Reportes rechazados por el admin agrupados por motivo
// ReportBoycott.ReportBoycottID = Report.ReportID.
export async function getRejectedReportsByMotive() {
  const result = await prisma.$queryRaw<
    { motive: string; total: bigint }[]
  >`
    SELECT m.MotiveName AS motive, COUNT(r.ReportID) AS total
    FROM Report r
    JOIN ReportBoycott rb ON r.ReportID = rb.ReportBoycottID
    JOIN MotiveReport m ON r.MotiveReportID = m.MotiveReportID
    JOIN ReportState rs ON r.ReportStateID = rs.ReportStateID
    WHERE LOWER(rs.StateName) IN ('rejected', 'rechazado')
    GROUP BY m.MotiveReportID, m.MotiveName
    ORDER BY total DESC
  `;
  return result.map((row) => ({
    motive: row.motive,
    total: Number(row.total),
  }));
}

// 12. Top 5 usuarios con más boycotts creados
// Boycott.CreatorID referencia AppUser.UserID.
export async function getTop5UsersByBoycotts() {
  const result = await prisma.$queryRaw<
    { userId: number; username: string; total: bigint }[]
  >`
    SELECT u.UserID AS userId, u.UserName AS username, COUNT(b.BoycottID) AS total
    FROM AppUser u
    JOIN Boycott b ON b.CreatorID = u.UserID
    GROUP BY u.UserID, u.UserName
    ORDER BY total DESC
    LIMIT 5
  `;
  return result.map((row) => ({
    userId: Number(row.userId),
    username: row.username,
    total: Number(row.total),
  }));
}

// 13. Tiempo promedio de resolución de reportes
// Calcula la cantidad promedio de días entre la creación y revisión de un reporte
// Utiliza las fechas ReportedAt y CheckedAt
export async function getAvgResolutionTimeBoycottReports() {
  const result = await prisma.$queryRaw<
    { avgDays: number | null }[]
  >`
    SELECT ROUND(AVG(DATEDIFF(r.CheckedAt, r.ReportedAt)), 2) AS avgDays
    FROM Report r
    JOIN ReportBoycott rb ON r.ReportID = rb.ReportBoycottID
    WHERE r.CheckedAt IS NOT NULL
      AND r.ReportedAt IS NOT NULL
  `;

  return {
    avgDays: result[0]?.avgDays ?? 0,
  };
}

// 14. Totales de reportes por estado
// Cuenta la cantidad de reportes agrupados por estado de moderación como Aprobado, Rechazado y Pendiente
export async function getBoycottReportStatusTotals() {
  const result = await prisma.$queryRaw<
    { status: string; total: bigint }[]
  >`
    SELECT rs.StateName AS status, COUNT(r.ReportID) AS total
    FROM Report r
    JOIN ReportBoycott rb ON r.ReportID = rb.ReportBoycottID
    JOIN ReportState rs ON r.ReportStateID = rs.ReportStateID
    GROUP BY rs.ReportStateID, rs.StateName
    ORDER BY total DESC
  `;
  return result.map((row) => ({
    status: row.status,
    total: Number(row.total),
  }));
}