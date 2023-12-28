import HTMLSanitize from '@/utils/htmlSanitizer';

type SafeHTMLProps = {
  html: string;
};

const SafeHTML = ({ html }: SafeHTMLProps) => {
	const sanitizedHtml = HTMLSanitize(html);
	return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default SafeHTML;
