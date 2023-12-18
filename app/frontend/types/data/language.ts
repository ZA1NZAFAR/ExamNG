export const LANGUAGES = ['javascript' , 'typescript' , 'css' , 'less' , 'scss' , 'json' , 'html' ,
	'xml' , 'php' , 'csharp' , 'cpp' , 'kotlin' , 'markdown' , 'java' , 'vb' , 'sql' ,
	'mysql' , 'batch' , 'yaml' , 'fsharp' , 'lua' , 'powershell' , 'python' , 'pgsql' , 'sass' ,
	'rust' , 'dockerfile'] as const;

/**
 * Represents a language.
 */
export type Language = typeof LANGUAGES[number];
