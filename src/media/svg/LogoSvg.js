function LogoSvg({className})
{
    return (
        <svg className={className} viewBox="0 0 22 22" fill="none">
            <path d="M1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H19C19.5304 6 20.0391 6.21071 20.4142 6.58579C20.7893 6.96086 21 7.46957 21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19Z" stroke="var(--third-color)" strokeWidth="1.875"/>
            <path d="M7.5 1.5L11 5L14.5 1.5" stroke="var(--third-color)" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default LogoSvg