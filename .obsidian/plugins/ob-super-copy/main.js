var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CopyFileMacOSPlugin
});
module.exports = __toCommonJS(main_exports);
var import_child_process = require("child_process");
var import_obsidian2 = require("obsidian");

// i18n.ts
var import_obsidian = require("obsidian");
var en = {
  codeBlockPlain: "Plain code block (no language)",
  copyFolder: "Copy folder",
  copyFile: "Copy file",
  copyCurrentFile: "Copy current file",
  newFile: "Add new",
  newFolder: "New folder",
  fileCreated: (path) => `Created file: ${path}`,
  fileCreateFailed: "Failed to create file",
  folderCreated: (path) => `Created folder: ${path}`,
  folderCreateFailed: "Failed to create folder",
  copyRelativePath: "Copy relative path",
  copyAbsolutePath: "Copy absolute path",
  relativePathCopied: (path) => `Relative path copied: ${path}`,
  absolutePathCopied: (path) => `Absolute path copied: ${path}`,
  pathCopyFailed: "Failed to copy path",
  absolutePathMacOnly: "Copy absolute path is only available in the macOS desktop app",
  insertMarkdownCodeBlock: "Insert Markdown code block",
  copyContent: "Copy content",
  contentCopied: (name) => `Content copied: ${name}`,
  contentCopyFailed: (name) => `Failed to copy content: ${name}`,
  copyFileMacOnly: "Copy file is only available in the macOS desktop app",
  localPathUnavailable: "Unable to access the local file path",
  fileCopied: (kind, name) => `${kind} copied: ${name}`,
  copyFailed: (name) => `Failed to copy: ${name}`,
  folderKind: "Folder",
  fileKind: "File",
  copyCurrentDocumentContent: "Copy current document content",
  noCurrentDocument: "There is no current document to copy",
  explorerActions: "File explorer actions",
  explorerActionsDesc: "Choose visible buttons.",
  explorerObjectType: "Explore item",
  explorerFolder: "Folder",
  explorerMarkdown: "Markdown .md",
  explorerText: "Plain text .txt",
  explorerOtherFiles: "Images, PDFs, attachments",
  toggleAllAction: (action) => `Toggle ${action} for all supported item types`,
  toggleActionForObject: (action, objectType) => `Toggle ${action} for ${objectType}`,
  actionUnavailable: "This action is not available for this item type",
  explorerMacOnlyNote: "Copy file and absolute path require macOS.",
  restoreExplorerActions: "Restore file explorer actions",
  restoreExplorerActionsDesc: "Restore recommended buttons.",
  restoreDefaults: "Restore defaults",
  explorerActionsRestored: "File explorer actions restored",
  showCopyFileButton: "Show copy file button",
  showCopyFileButtonDesc: "Enable copying files and folders from file explorer rows and context menus. This feature is only available in the macOS desktop app.",
  showCopyContentButton: "Show copy content button",
  showCopyContentButtonDesc: "Show a button for copying document text on Markdown and plain-text file rows.",
  showNewFileButton: "Show new file button",
  showNewFileButtonDesc: "Show a button on folder rows to create a blank Markdown file in that folder.",
  showCopyRelativePathButton: "Show copy relative path button",
  showCopyRelativePathButtonDesc: "Show a button for copying the path relative to the vault root on files and folders.",
  showCopyAbsolutePathButton: "Show copy absolute path button",
  showCopyAbsolutePathButtonDesc: "Show a button for copying the local absolute path on files and folders. This feature is only available in the macOS desktop app.",
  documentContentArea: "Document content area",
  documentContentAreaDesc: "Actions in open documents.",
  showCopyDocumentButton: "Show copy document button",
  showCopyDocumentButtonDesc: "Copy the whole document.",
  codeBlockInsertion: "Code block insertion",
  codeBlockInsertionDesc: "Insert or wrap a code block.",
  enableCodeBlockCommand: "Enable code block insertion command",
  enableCodeBlockCommandDesc: "Assign a shortcut in Hotkeys.",
  defaultCodeBlockLanguage: "Default code block language",
  defaultCodeBlockLanguageDesc: "Language used when inserting.",
  customLanguage: (language) => `Custom: ${language}`
};
var zh = {
  copyRelativePath: "\u590D\u5236\u76F8\u5BF9\u5730\u5740",
  copyAbsolutePath: "\u590D\u5236\u7EDD\u5BF9\u5730\u5740",
  relativePathCopied: (path) => `\u5DF2\u590D\u5236\u76F8\u5BF9\u5730\u5740\uFF1A${path}`,
  absolutePathCopied: (path) => `\u5DF2\u590D\u5236\u7EDD\u5BF9\u5730\u5740\uFF1A${path}`,
  pathCopyFailed: "\u590D\u5236\u5730\u5740\u5931\u8D25",
  absolutePathMacOnly: "\u201C\u590D\u5236\u7EDD\u5BF9\u5730\u5740\u201D\u4EC5\u652F\u6301 macOS \u684C\u9762\u7248",
  codeBlockPlain: "\u666E\u901A\u4EE3\u7801\u6846\uFF08\u4E0D\u6307\u5B9A\u8BED\u8A00\uFF09",
  copyFolder: "\u590D\u5236\u6587\u4EF6\u5939",
  copyFile: "\u590D\u5236\u6587\u4EF6",
  copyCurrentFile: "\u590D\u5236\u5F53\u524D\u6587\u4EF6",
  newFile: "\u65B0\u5EFA",
  newFolder: "\u65B0\u5EFA\u6587\u4EF6\u5939",
  fileCreated: (path) => `\u5DF2\u65B0\u5EFA\u6587\u4EF6\uFF1A${path}`,
  fileCreateFailed: "\u65B0\u5EFA\u6587\u4EF6\u5931\u8D25",
  folderCreated: (path) => `\u5DF2\u65B0\u5EFA\u6587\u4EF6\u5939\uFF1A${path}`,
  folderCreateFailed: "\u65B0\u5EFA\u6587\u4EF6\u5939\u5931\u8D25",
  insertMarkdownCodeBlock: "\u63D2\u5165 Markdown \u4EE3\u7801\u6846",
  copyContent: "\u590D\u5236\u5185\u5BB9",
  contentCopied: (name) => `\u5DF2\u590D\u5236\u5185\u5BB9\uFF1A${name}`,
  contentCopyFailed: (name) => `\u590D\u5236\u5185\u5BB9\u5931\u8D25\uFF1A${name}`,
  copyFileMacOnly: "\u201C\u590D\u5236\u6587\u4EF6\u201D\u4EC5\u652F\u6301 macOS \u684C\u9762\u7248",
  localPathUnavailable: "\u65E0\u6CD5\u83B7\u53D6\u6587\u4EF6\u7684\u672C\u5730\u8DEF\u5F84",
  fileCopied: (kind, name) => `\u5DF2\u590D\u5236${kind}\uFF1A${name}`,
  copyFailed: (name) => `\u590D\u5236\u5931\u8D25\uFF1A${name}`,
  folderKind: "\u6587\u4EF6\u5939",
  fileKind: "\u6587\u4EF6",
  copyCurrentDocumentContent: "\u590D\u5236\u5F53\u524D\u6587\u6863\u5185\u5BB9",
  noCurrentDocument: "\u6CA1\u6709\u53EF\u590D\u5236\u7684\u5F53\u524D\u6587\u6863",
  explorerActions: "\u6587\u4EF6\u5217\u8868\u64CD\u4F5C",
  explorerActionsDesc: "\u9009\u62E9\u663E\u793A\u7684\u6309\u94AE\u3002",
  explorerObjectType: "Explore \u5BF9\u8C61",
  explorerFolder: "\u6587\u4EF6\u5939",
  explorerMarkdown: "Markdown .md",
  explorerText: "\u7EAF\u6587\u672C .txt",
  explorerOtherFiles: "\u56FE\u7247\u3001PDF\u3001\u9644\u4EF6",
  toggleAllAction: (action) => `\u4E3A\u6240\u6709\u652F\u6301\u7684\u5BF9\u8C61\u5207\u6362\u201C${action}\u201D`,
  toggleActionForObject: (action, objectType) => `\u4E3A${objectType}\u5207\u6362\u201C${action}\u201D`,
  actionUnavailable: "\u6B64\u529F\u80FD\u4E0D\u9002\u7528\u4E8E\u8BE5\u5BF9\u8C61\u7C7B\u578B",
  explorerMacOnlyNote: "\u590D\u5236\u6587\u4EF6\u548C\u7EDD\u5BF9\u5730\u5740\u4EC5\u9650 macOS\u3002",
  restoreExplorerActions: "\u6062\u590D\u6587\u4EF6\u5217\u8868\u64CD\u4F5C",
  restoreExplorerActionsDesc: "\u6062\u590D\u63A8\u8350\u7684\u6309\u94AE\u3002",
  restoreDefaults: "\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E",
  explorerActionsRestored: "\u5DF2\u6062\u590D\u6587\u4EF6\u5217\u8868\u64CD\u4F5C",
  showCopyFileButton: "\u663E\u793A\u590D\u5236\u6587\u4EF6\u6309\u94AE",
  showCopyFileButtonDesc: "\u5728\u6587\u4EF6\u5217\u8868\u884C\u548C\u53F3\u952E\u83DC\u5355\u4E2D\u542F\u7528\u590D\u5236\u6587\u4EF6/\u6587\u4EF6\u5939\u3002\u6B64\u529F\u80FD\u53EA\u652F\u6301 macOS \u684C\u9762\u7248\u3002",
  showCopyContentButton: "\u663E\u793A\u590D\u5236\u5185\u5BB9\u6309\u94AE",
  showCopyContentButtonDesc: "\u5728 Markdown \u548C\u7EAF\u6587\u672C\u6587\u4EF6\u884C\u4E0A\u663E\u793A\u590D\u5236\u6587\u6863\u6587\u672C\u5185\u5BB9\u7684\u6309\u94AE\u3002",
  showNewFileButton: "\u663E\u793A\u65B0\u5EFA\u6587\u4EF6\u6309\u94AE",
  showNewFileButtonDesc: "\u5728\u6587\u4EF6\u5939\u884C\u663E\u793A\u65B0\u5EFA\u7A7A\u767D Markdown \u6587\u4EF6\u7684\u6309\u94AE\u3002",
  showCopyRelativePathButton: "\u663E\u793A\u590D\u5236\u76F8\u5BF9\u5730\u5740\u6309\u94AE",
  showCopyRelativePathButtonDesc: "\u5728\u6587\u4EF6\u548C\u6587\u4EF6\u5939\u884C\u663E\u793A\u590D\u5236\u76F8\u5BF9\u4E8E\u5E93\u6839\u76EE\u5F55\u5730\u5740\u7684\u6309\u94AE\u3002",
  showCopyAbsolutePathButton: "\u663E\u793A\u590D\u5236\u7EDD\u5BF9\u5730\u5740\u6309\u94AE",
  showCopyAbsolutePathButtonDesc: "\u5728\u6587\u4EF6\u548C\u6587\u4EF6\u5939\u884C\u663E\u793A\u590D\u5236\u672C\u673A\u7EDD\u5BF9\u5730\u5740\u7684\u6309\u94AE\u3002\u6B64\u529F\u80FD\u53EA\u652F\u6301 macOS \u684C\u9762\u7248\u3002",
  documentContentArea: "\u6587\u6863\u5185\u5BB9\u533A",
  documentContentAreaDesc: "\u6253\u5F00\u6587\u6863\u4E2D\u7684\u64CD\u4F5C\u3002",
  showCopyDocumentButton: "\u663E\u793A\u590D\u5236\u5168\u6587\u6309\u94AE",
  showCopyDocumentButtonDesc: "\u590D\u5236\u6574\u7BC7\u6587\u6863\u3002",
  codeBlockInsertion: "\u4EE3\u7801\u6846\u5FEB\u6377\u63D2\u5165",
  codeBlockInsertionDesc: "\u63D2\u5165\u6216\u5305\u88F9\u4EE3\u7801\u6846\u3002",
  enableCodeBlockCommand: "\u542F\u7528\u4EE3\u7801\u6846\u63D2\u5165\u547D\u4EE4",
  enableCodeBlockCommandDesc: "\u53EF\u5728\u5FEB\u6377\u952E\u4E2D\u5206\u914D\u6309\u952E\u3002",
  defaultCodeBlockLanguage: "\u9ED8\u8BA4\u4EE3\u7801\u6846\u7C7B\u578B",
  defaultCodeBlockLanguageDesc: "\u63D2\u5165\u65F6\u4F7F\u7528\u7684\u8BED\u8A00\u6807\u8BB0\u3002",
  customLanguage: (language) => `\u81EA\u5B9A\u4E49\uFF1A${language}`
};
var zhTW = {
  copyRelativePath: "\u8907\u88FD\u76F8\u5C0D\u8DEF\u5F91",
  copyAbsolutePath: "\u8907\u88FD\u7D55\u5C0D\u8DEF\u5F91",
  relativePathCopied: (path) => `\u5DF2\u8907\u88FD\u76F8\u5C0D\u8DEF\u5F91\uFF1A${path}`,
  absolutePathCopied: (path) => `\u5DF2\u8907\u88FD\u7D55\u5C0D\u8DEF\u5F91\uFF1A${path}`,
  pathCopyFailed: "\u8907\u88FD\u8DEF\u5F91\u5931\u6557",
  absolutePathMacOnly: "\u300C\u8907\u88FD\u7D55\u5C0D\u8DEF\u5F91\u300D\u50C5\u652F\u63F4 macOS \u684C\u9762\u7248",
  codeBlockPlain: "\u4E00\u822C\u7A0B\u5F0F\u78BC\u5340\u584A\uFF08\u4E0D\u6307\u5B9A\u8A9E\u8A00\uFF09",
  copyFolder: "\u8907\u88FD\u8CC7\u6599\u593E",
  copyFile: "\u8907\u88FD\u6A94\u6848",
  copyCurrentFile: "\u8907\u88FD\u76EE\u524D\u6A94\u6848",
  newFile: "\u65B0\u589E",
  newFolder: "\u65B0\u589E\u8CC7\u6599\u593E",
  fileCreated: (path) => `\u5DF2\u65B0\u589E\u6A94\u6848\uFF1A${path}`,
  fileCreateFailed: "\u65B0\u589E\u6A94\u6848\u5931\u6557",
  folderCreated: (path) => `\u5DF2\u65B0\u589E\u8CC7\u6599\u593E\uFF1A${path}`,
  folderCreateFailed: "\u65B0\u589E\u8CC7\u6599\u593E\u5931\u6557",
  insertMarkdownCodeBlock: "\u63D2\u5165 Markdown \u7A0B\u5F0F\u78BC\u5340\u584A",
  copyContent: "\u8907\u88FD\u5167\u5BB9",
  contentCopied: (name) => `\u5DF2\u8907\u88FD\u5167\u5BB9\uFF1A${name}`,
  contentCopyFailed: (name) => `\u8907\u88FD\u5167\u5BB9\u5931\u6557\uFF1A${name}`,
  copyFileMacOnly: "\u300C\u8907\u88FD\u6A94\u6848\u300D\u50C5\u652F\u63F4 macOS \u684C\u9762\u7248",
  localPathUnavailable: "\u7121\u6CD5\u53D6\u5F97\u6A94\u6848\u7684\u672C\u6A5F\u8DEF\u5F91",
  fileCopied: (kind, name) => `\u5DF2\u8907\u88FD${kind}\uFF1A${name}`,
  copyFailed: (name) => `\u8907\u88FD\u5931\u6557\uFF1A${name}`,
  folderKind: "\u8CC7\u6599\u593E",
  fileKind: "\u6A94\u6848",
  copyCurrentDocumentContent: "\u8907\u88FD\u76EE\u524D\u6587\u4EF6\u5167\u5BB9",
  noCurrentDocument: "\u6C92\u6709\u53EF\u8907\u88FD\u7684\u76EE\u524D\u6587\u4EF6",
  explorerActions: "\u6A94\u6848\u7E3D\u7BA1\u64CD\u4F5C",
  explorerActionsDesc: "\u9078\u64C7\u8981\u986F\u793A\u7684\u6309\u9215\u3002",
  explorerObjectType: "\u6A94\u6848\u7E3D\u7BA1\u9805\u76EE",
  explorerFolder: "\u8CC7\u6599\u593E",
  explorerMarkdown: "Markdown .md",
  explorerText: "\u7D14\u6587\u5B57 .txt",
  explorerOtherFiles: "\u5716\u7247\u3001PDF\u3001\u9644\u4EF6",
  toggleAllAction: (action) => `\u70BA\u6240\u6709\u652F\u63F4\u7684\u9805\u76EE\u5207\u63DB\u300C${action}\u300D`,
  toggleActionForObject: (action, objectType) => `\u70BA${objectType}\u5207\u63DB\u300C${action}\u300D`,
  actionUnavailable: "\u6B64\u529F\u80FD\u4E0D\u9069\u7528\u65BC\u6B64\u9805\u76EE\u985E\u578B",
  explorerMacOnlyNote: "\u8907\u88FD\u6A94\u6848\u548C\u7D55\u5C0D\u8DEF\u5F91\u50C5\u9650 macOS\u3002",
  restoreExplorerActions: "\u9084\u539F\u6A94\u6848\u7E3D\u7BA1\u64CD\u4F5C",
  restoreExplorerActionsDesc: "\u9084\u539F\u5EFA\u8B70\u7684\u6309\u9215\u3002",
  restoreDefaults: "\u9084\u539F\u9810\u8A2D\u503C",
  explorerActionsRestored: "\u5DF2\u9084\u539F\u6A94\u6848\u7E3D\u7BA1\u64CD\u4F5C",
  showCopyFileButton: "\u986F\u793A\u8907\u88FD\u6A94\u6848\u6309\u9215",
  showCopyFileButtonDesc: "\u5728\u6A94\u6848\u5217\u8868\u884C\u986F\u793A\u8907\u88FD\u6309\u9215\u3002",
  showCopyContentButton: "\u986F\u793A\u8907\u88FD\u5167\u5BB9\u6309\u9215",
  showCopyContentButtonDesc: "\u5728 Markdown \u548C\u7D14\u6587\u5B57\u6A94\u6848\u5217\u986F\u793A\u5167\u5BB9\u8907\u88FD\u6309\u9215\u3002",
  showNewFileButton: "\u986F\u793A\u65B0\u589E\u6A94\u6848\u6309\u9215",
  showNewFileButtonDesc: "\u5728\u8CC7\u6599\u593E\u5217\u986F\u793A\u65B0\u589E\u7A7A\u767D Markdown \u6A94\u6848\u7684\u6309\u9215\u3002",
  showCopyRelativePathButton: "\u986F\u793A\u8907\u88FD\u76F8\u5C0D\u8DEF\u5F91\u6309\u9215",
  showCopyRelativePathButtonDesc: "\u5728\u6A94\u6848\u548C\u8CC7\u6599\u593E\u5217\u986F\u793A\u8907\u88FD\u76F8\u5C0D\u65BC\u5EAB\u6839\u76EE\u9304\u8DEF\u5F91\u7684\u6309\u9215\u3002",
  showCopyAbsolutePathButton: "\u986F\u793A\u8907\u88FD\u7D55\u5C0D\u8DEF\u5F91\u6309\u9215",
  showCopyAbsolutePathButtonDesc: "\u5728\u6A94\u6848\u548C\u8CC7\u6599\u593E\u5217\u986F\u793A\u8907\u88FD\u672C\u6A5F\u7D55\u5C0D\u8DEF\u5F91\u7684\u6309\u9215\u3002\u6B64\u529F\u80FD\u50C5\u652F\u63F4 macOS \u684C\u9762\u7248\u3002",
  documentContentArea: "\u6587\u4EF6\u5167\u5BB9\u5340\u57DF",
  documentContentAreaDesc: "\u958B\u555F\u6587\u4EF6\u4E2D\u7684\u64CD\u4F5C\u3002",
  showCopyDocumentButton: "\u986F\u793A\u8907\u88FD\u5168\u6587\u6309\u9215",
  showCopyDocumentButtonDesc: "\u8907\u88FD\u6574\u7BC7\u6587\u4EF6\u3002",
  codeBlockInsertion: "\u63D2\u5165\u7A0B\u5F0F\u78BC\u5340\u584A",
  codeBlockInsertionDesc: "\u63D2\u5165\u6216\u5305\u4F4F\u7A0B\u5F0F\u78BC\u5340\u584A\u3002",
  enableCodeBlockCommand: "\u555F\u7528\u63D2\u5165\u7A0B\u5F0F\u78BC\u5340\u584A\u547D\u4EE4",
  enableCodeBlockCommandDesc: "\u53EF\u5728\u5FEB\u6377\u9375\u4E2D\u6307\u5B9A\u6309\u9375\u3002",
  defaultCodeBlockLanguage: "\u9810\u8A2D\u7A0B\u5F0F\u78BC\u5340\u584A\u8A9E\u8A00",
  defaultCodeBlockLanguageDesc: "\u63D2\u5165\u6642\u4F7F\u7528\u7684\u8A9E\u8A00\u8B58\u5225\u78BC\u3002",
  customLanguage: (language) => `\u81EA\u8A02\uFF1A${language}`
};
var ja = {
  copyRelativePath: "\u76F8\u5BFE\u30D1\u30B9\u3092\u30B3\u30D4\u30FC",
  copyAbsolutePath: "\u7D76\u5BFE\u30D1\u30B9\u3092\u30B3\u30D4\u30FC",
  relativePathCopied: (path) => `\u76F8\u5BFE\u30D1\u30B9\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\uFF1A${path}`,
  absolutePathCopied: (path) => `\u7D76\u5BFE\u30D1\u30B9\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\uFF1A${path}`,
  pathCopyFailed: "\u30D1\u30B9\u3092\u30B3\u30D4\u30FC\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F",
  absolutePathMacOnly: "\u7D76\u5BFE\u30D1\u30B9\u306E\u30B3\u30D4\u30FC\u306F macOS \u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u7248\u3067\u306E\u307F\u5229\u7528\u3067\u304D\u307E\u3059",
  codeBlockPlain: "\u30D7\u30EC\u30FC\u30F3\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF\uFF08\u8A00\u8A9E\u6307\u5B9A\u306A\u3057\uFF09",
  copyFolder: "\u30D5\u30A9\u30EB\u30C0\u30FC\u3092\u30B3\u30D4\u30FC",
  copyFile: "\u30D5\u30A1\u30A4\u30EB\u3092\u30B3\u30D4\u30FC",
  copyCurrentFile: "\u73FE\u5728\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u30B3\u30D4\u30FC",
  newFile: "\u65B0\u898F\u4F5C\u6210",
  newFolder: "\u65B0\u898F\u30D5\u30A9\u30EB\u30C0\u30FC",
  fileCreated: (path) => `\u30D5\u30A1\u30A4\u30EB\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F\uFF1A${path}`,
  fileCreateFailed: "\u30D5\u30A1\u30A4\u30EB\u3092\u4F5C\u6210\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F",
  folderCreated: (path) => `\u30D5\u30A9\u30EB\u30C0\u30FC\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F\uFF1A${path}`,
  folderCreateFailed: "\u30D5\u30A9\u30EB\u30C0\u30FC\u3092\u4F5C\u6210\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F",
  insertMarkdownCodeBlock: "Markdown \u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF\u3092\u633F\u5165",
  copyContent: "\u5185\u5BB9\u3092\u30B3\u30D4\u30FC",
  contentCopied: (name) => `\u5185\u5BB9\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\uFF1A${name}`,
  contentCopyFailed: (name) => `\u5185\u5BB9\u3092\u30B3\u30D4\u30FC\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\uFF1A${name}`,
  copyFileMacOnly: "\u300C\u30D5\u30A1\u30A4\u30EB\u3092\u30B3\u30D4\u30FC\u300D\u306F macOS \u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u7248\u3067\u306E\u307F\u5229\u7528\u3067\u304D\u307E\u3059",
  localPathUnavailable: "\u30ED\u30FC\u30AB\u30EB\u30D5\u30A1\u30A4\u30EB\u306E\u30D1\u30B9\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093",
  fileCopied: (kind, name) => `${kind}\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\uFF1A${name}`,
  copyFailed: (name) => `\u30B3\u30D4\u30FC\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\uFF1A${name}`,
  folderKind: "\u30D5\u30A9\u30EB\u30C0\u30FC",
  fileKind: "\u30D5\u30A1\u30A4\u30EB",
  copyCurrentDocumentContent: "\u73FE\u5728\u306E\u6587\u66F8\u306E\u5185\u5BB9\u3092\u30B3\u30D4\u30FC",
  noCurrentDocument: "\u30B3\u30D4\u30FC\u3067\u304D\u308B\u6587\u66F8\u304C\u3042\u308A\u307E\u305B\u3093",
  explorerActions: "\u30D5\u30A1\u30A4\u30EB\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30E9\u30FC\u306E\u64CD\u4F5C",
  explorerActionsDesc: "\u8868\u793A\u3059\u308B\u30DC\u30BF\u30F3\u3092\u9078\u629E\u3057\u307E\u3059\u3002",
  explorerObjectType: "\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30E9\u30FC\u9805\u76EE",
  explorerFolder: "\u30D5\u30A9\u30EB\u30C0\u30FC",
  explorerMarkdown: "Markdown .md",
  explorerText: "\u30D7\u30EC\u30FC\u30F3\u30C6\u30AD\u30B9\u30C8 .txt",
  explorerOtherFiles: "\u753B\u50CF\u3001PDF\u3001\u6DFB\u4ED8\u30D5\u30A1\u30A4\u30EB",
  toggleAllAction: (action) => `\u5BFE\u5FDC\u3059\u308B\u3059\u3079\u3066\u306E\u9805\u76EE\u3067\u300C${action}\u300D\u3092\u5207\u308A\u66FF\u3048`,
  toggleActionForObject: (action, objectType) => `${objectType}\u3067\u300C${action}\u300D\u3092\u5207\u308A\u66FF\u3048`,
  actionUnavailable: "\u3053\u306E\u64CD\u4F5C\u306F\u3053\u306E\u9805\u76EE\u306E\u7A2E\u985E\u3067\u306F\u5229\u7528\u3067\u304D\u307E\u305B\u3093",
  explorerMacOnlyNote: "\u30D5\u30A1\u30A4\u30EB\u3068\u7D76\u5BFE\u30D1\u30B9\u306E\u30B3\u30D4\u30FC\u306F macOS \u306E\u307F\u3067\u3059\u3002",
  restoreExplorerActions: "\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30E9\u30FC\u64CD\u4F5C\u3092\u5FA9\u5143",
  restoreExplorerActionsDesc: "\u63A8\u5968\u30DC\u30BF\u30F3\u3092\u5FA9\u5143\u3057\u307E\u3059\u3002",
  restoreDefaults: "\u65E2\u5B9A\u5024\u306B\u623B\u3059",
  explorerActionsRestored: "\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30E9\u30FC\u64CD\u4F5C\u3092\u5FA9\u5143\u3057\u307E\u3057\u305F",
  showCopyFileButton: "\u30D5\u30A1\u30A4\u30EB\u30B3\u30D4\u30FC\u30DC\u30BF\u30F3\u3092\u8868\u793A",
  showCopyFileButtonDesc: "\u30D5\u30A1\u30A4\u30EB\u884C\u306B\u30B3\u30D4\u30FC\u30DC\u30BF\u30F3\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
  showCopyContentButton: "\u5185\u5BB9\u30B3\u30D4\u30FC\u30DC\u30BF\u30F3\u3092\u8868\u793A",
  showCopyContentButtonDesc: "\u5BFE\u5FDC\u30D5\u30A1\u30A4\u30EB\u306B\u5185\u5BB9\u30B3\u30D4\u30FC\u30DC\u30BF\u30F3\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
  showNewFileButton: "\u65B0\u898F\u30D5\u30A1\u30A4\u30EB\u30DC\u30BF\u30F3\u3092\u8868\u793A",
  showNewFileButtonDesc: "\u30D5\u30A9\u30EB\u30C0\u30FC\u884C\u306B\u7A7A\u306E Markdown \u30D5\u30A1\u30A4\u30EB\u3092\u4F5C\u6210\u3059\u308B\u30DC\u30BF\u30F3\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
  showCopyRelativePathButton: "\u76F8\u5BFE\u30D1\u30B9\u30B3\u30D4\u30FC\u30DC\u30BF\u30F3\u3092\u8868\u793A",
  showCopyRelativePathButtonDesc: "\u30D5\u30A1\u30A4\u30EB\u3068\u30D5\u30A9\u30EB\u30C0\u30FC\u884C\u306B\u4FDD\u7BA1\u5EAB\u306E\u30EB\u30FC\u30C8\u304B\u3089\u306E\u76F8\u5BFE\u30D1\u30B9\u3092\u30B3\u30D4\u30FC\u3059\u308B\u30DC\u30BF\u30F3\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
  showCopyAbsolutePathButton: "\u7D76\u5BFE\u30D1\u30B9\u30B3\u30D4\u30FC\u30DC\u30BF\u30F3\u3092\u8868\u793A",
  showCopyAbsolutePathButtonDesc: "\u30D5\u30A1\u30A4\u30EB\u3068\u30D5\u30A9\u30EB\u30C0\u30FC\u884C\u306B\u30ED\u30FC\u30AB\u30EB\u7D76\u5BFE\u30D1\u30B9\u3092\u30B3\u30D4\u30FC\u3059\u308B\u30DC\u30BF\u30F3\u3092\u8868\u793A\u3057\u307E\u3059\u3002\u3053\u306E\u6A5F\u80FD\u306F macOS \u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u7248\u3067\u306E\u307F\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
  documentContentArea: "\u6587\u66F8\u306E\u5185\u5BB9\u9818\u57DF",
  documentContentAreaDesc: "\u958B\u3044\u3066\u3044\u308B\u6587\u66F8\u306E\u64CD\u4F5C\u3002",
  showCopyDocumentButton: "\u5168\u6587\u30B3\u30D4\u30FC\u30DC\u30BF\u30F3\u3092\u8868\u793A",
  showCopyDocumentButtonDesc: "\u6587\u66F8\u5168\u4F53\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3059\u3002",
  codeBlockInsertion: "\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF\u306E\u633F\u5165",
  codeBlockInsertionDesc: "\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF\u3092\u633F\u5165\u307E\u305F\u306F\u56F2\u307F\u307E\u3059\u3002",
  enableCodeBlockCommand: "\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF\u633F\u5165\u30B3\u30DE\u30F3\u30C9\u3092\u6709\u52B9\u5316",
  enableCodeBlockCommandDesc: "\u30DB\u30C3\u30C8\u30AD\u30FC\u3067\u5272\u308A\u5F53\u3066\u307E\u3059\u3002",
  defaultCodeBlockLanguage: "\u65E2\u5B9A\u306E\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF\u8A00\u8A9E",
  defaultCodeBlockLanguageDesc: "\u633F\u5165\u6642\u306E\u8A00\u8A9E\u3067\u3059\u3002",
  customLanguage: (language) => `\u30AB\u30B9\u30BF\u30E0\uFF1A${language}`
};
var ko = {
  copyRelativePath: "\uC0C1\uB300 \uACBD\uB85C \uBCF5\uC0AC",
  copyAbsolutePath: "\uC808\uB300 \uACBD\uB85C \uBCF5\uC0AC",
  relativePathCopied: (path) => `\uC0C1\uB300 \uACBD\uB85C\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4: ${path}`,
  absolutePathCopied: (path) => `\uC808\uB300 \uACBD\uB85C\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4: ${path}`,
  pathCopyFailed: "\uACBD\uB85C\uB97C \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",
  absolutePathMacOnly: "\uC808\uB300 \uACBD\uB85C \uBCF5\uC0AC\uB294 macOS \uB370\uC2A4\uD06C\uD1B1 \uC571\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
  codeBlockPlain: "\uC77C\uBC18 \uCF54\uB4DC \uBE14\uB85D(\uC5B8\uC5B4 \uC9C0\uC815 \uC5C6\uC74C)",
  copyFolder: "\uD3F4\uB354 \uBCF5\uC0AC",
  copyFile: "\uD30C\uC77C \uBCF5\uC0AC",
  copyCurrentFile: "\uD604\uC7AC \uD30C\uC77C \uBCF5\uC0AC",
  newFile: "\uC0C8\uB85C \uB9CC\uB4E4\uAE30",
  newFolder: "\uC0C8 \uD3F4\uB354",
  fileCreated: (path) => `\uD30C\uC77C\uC744 \uB9CC\uB4E4\uC5C8\uC2B5\uB2C8\uB2E4: ${path}`,
  fileCreateFailed: "\uD30C\uC77C\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",
  folderCreated: (path) => `\uD3F4\uB354\uB97C \uB9CC\uB4E4\uC5C8\uC2B5\uB2C8\uB2E4: ${path}`,
  folderCreateFailed: "\uD3F4\uB354\uB97C \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",
  insertMarkdownCodeBlock: "Markdown \uCF54\uB4DC \uBE14\uB85D \uC0BD\uC785",
  copyContent: "\uB0B4\uC6A9 \uBCF5\uC0AC",
  contentCopied: (name) => `\uB0B4\uC6A9\uC744 \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4: ${name}`,
  contentCopyFailed: (name) => `\uB0B4\uC6A9\uC744 \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${name}`,
  copyFileMacOnly: "\u2018\uD30C\uC77C \uBCF5\uC0AC\u2019\uB294 macOS \uB370\uC2A4\uD06C\uD1B1 \uC571\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
  localPathUnavailable: "\uB85C\uCEEC \uD30C\uC77C \uACBD\uB85C\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",
  fileCopied: (_kind, name) => `\uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4: ${name}`,
  copyFailed: (name) => `\uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${name}`,
  folderKind: "\uD3F4\uB354",
  fileKind: "\uD30C\uC77C",
  copyCurrentDocumentContent: "\uD604\uC7AC \uBB38\uC11C \uB0B4\uC6A9 \uBCF5\uC0AC",
  noCurrentDocument: "\uBCF5\uC0AC\uD560 \uD604\uC7AC \uBB38\uC11C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4",
  explorerActions: "\uD30C\uC77C \uD0D0\uC0C9\uAE30 \uB3D9\uC791",
  explorerActionsDesc: "\uD45C\uC2DC\uD560 \uBC84\uD2BC\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4.",
  explorerObjectType: "\uD0D0\uC0C9\uAE30 \uD56D\uBAA9",
  explorerFolder: "\uD3F4\uB354",
  explorerMarkdown: "Markdown .md",
  explorerText: "\uC77C\uBC18 \uD14D\uC2A4\uD2B8 .txt",
  explorerOtherFiles: "\uC774\uBBF8\uC9C0, PDF, \uCCA8\uBD80 \uD30C\uC77C",
  toggleAllAction: (action) => `\uC9C0\uC6D0\uB418\uB294 \uBAA8\uB4E0 \uD56D\uBAA9\uC5D0\uC11C '${action}' \uC804\uD658`,
  toggleActionForObject: (action, objectType) => `${objectType}\uC5D0\uC11C '${action}' \uC804\uD658`,
  actionUnavailable: "\uC774 \uD56D\uBAA9 \uC720\uD615\uC5D0\uC11C\uB294 \uC774 \uB3D9\uC791\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",
  explorerMacOnlyNote: "\uD30C\uC77C\uACFC \uC808\uB300 \uACBD\uB85C \uBCF5\uC0AC\uB294 macOS \uC804\uC6A9\uC785\uB2C8\uB2E4.",
  restoreExplorerActions: "\uD30C\uC77C \uD0D0\uC0C9\uAE30 \uB3D9\uC791 \uBCF5\uC6D0",
  restoreExplorerActionsDesc: "\uCD94\uCC9C \uBC84\uD2BC\uC744 \uBCF5\uC6D0\uD569\uB2C8\uB2E4.",
  restoreDefaults: "\uAE30\uBCF8\uAC12 \uBCF5\uC6D0",
  explorerActionsRestored: "\uD30C\uC77C \uD0D0\uC0C9\uAE30 \uB3D9\uC791\uC744 \uBCF5\uC6D0\uD588\uC2B5\uB2C8\uB2E4",
  showCopyFileButton: "\uD30C\uC77C \uBCF5\uC0AC \uBC84\uD2BC \uD45C\uC2DC",
  showCopyFileButtonDesc: "\uD30C\uC77C \uD589\uC5D0 \uBCF5\uC0AC \uBC84\uD2BC\uC744 \uD45C\uC2DC\uD569\uB2C8\uB2E4.",
  showCopyContentButton: "\uB0B4\uC6A9 \uBCF5\uC0AC \uBC84\uD2BC \uD45C\uC2DC",
  showCopyContentButtonDesc: "\uC9C0\uC6D0 \uD30C\uC77C\uC5D0 \uB0B4\uC6A9 \uBCF5\uC0AC \uBC84\uD2BC\uC744 \uD45C\uC2DC\uD569\uB2C8\uB2E4.",
  showNewFileButton: "\uC0C8 \uD30C\uC77C \uBC84\uD2BC \uD45C\uC2DC",
  showNewFileButtonDesc: "\uD3F4\uB354 \uD589\uC5D0 \uBE48 Markdown \uD30C\uC77C\uC744 \uB9CC\uB4DC\uB294 \uBC84\uD2BC\uC744 \uD45C\uC2DC\uD569\uB2C8\uB2E4.",
  showCopyRelativePathButton: "\uC0C1\uB300 \uACBD\uB85C \uBCF5\uC0AC \uBC84\uD2BC \uD45C\uC2DC",
  showCopyRelativePathButtonDesc: "\uD30C\uC77C\uACFC \uD3F4\uB354 \uD589\uC5D0 \uBCF4\uAD00\uD568 \uB8E8\uD2B8 \uAE30\uC900 \uACBD\uB85C\uB97C \uBCF5\uC0AC\uD558\uB294 \uBC84\uD2BC\uC744 \uD45C\uC2DC\uD569\uB2C8\uB2E4.",
  showCopyAbsolutePathButton: "\uC808\uB300 \uACBD\uB85C \uBCF5\uC0AC \uBC84\uD2BC \uD45C\uC2DC",
  showCopyAbsolutePathButtonDesc: "\uD30C\uC77C\uACFC \uD3F4\uB354 \uD589\uC5D0 \uB85C\uCEEC \uC808\uB300 \uACBD\uB85C\uB97C \uBCF5\uC0AC\uD558\uB294 \uBC84\uD2BC\uC744 \uD45C\uC2DC\uD569\uB2C8\uB2E4. \uC774 \uAE30\uB2A5\uC740 macOS \uB370\uC2A4\uD06C\uD1B1 \uC571\uC5D0\uC11C\uB9CC \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
  documentContentArea: "\uBB38\uC11C \uB0B4\uC6A9 \uC601\uC5ED",
  documentContentAreaDesc: "\uC5F4\uB9B0 \uBB38\uC11C\uC758 \uB3D9\uC791\uC785\uB2C8\uB2E4.",
  showCopyDocumentButton: "\uBB38\uC11C \uBCF5\uC0AC \uBC84\uD2BC \uD45C\uC2DC",
  showCopyDocumentButtonDesc: "\uBB38\uC11C \uC804\uCCB4\uB97C \uBCF5\uC0AC\uD569\uB2C8\uB2E4.",
  codeBlockInsertion: "\uCF54\uB4DC \uBE14\uB85D \uC0BD\uC785",
  codeBlockInsertionDesc: "\uCF54\uB4DC \uBE14\uB85D\uC744 \uC0BD\uC785\uD558\uAC70\uB098 \uAC10\uC309\uB2C8\uB2E4.",
  enableCodeBlockCommand: "\uCF54\uB4DC \uBE14\uB85D \uC0BD\uC785 \uBA85\uB839 \uD65C\uC131\uD654",
  enableCodeBlockCommandDesc: "\uB2E8\uCD95\uD0A4\uC5D0\uC11C \uC9C0\uC815\uD569\uB2C8\uB2E4.",
  defaultCodeBlockLanguage: "\uAE30\uBCF8 \uCF54\uB4DC \uBE14\uB85D \uC5B8\uC5B4",
  defaultCodeBlockLanguageDesc: "\uC0BD\uC785\uD560 \uB54C \uC0AC\uC6A9\uD560 \uC5B8\uC5B4\uC785\uB2C8\uB2E4.",
  customLanguage: (language) => `\uC0AC\uC6A9\uC790 \uC9C0\uC815: ${language}`
};
var de = {
  copyRelativePath: "Relativen Pfad kopieren",
  copyAbsolutePath: "Absoluten Pfad kopieren",
  relativePathCopied: (path) => `Relativer Pfad kopiert: ${path}`,
  absolutePathCopied: (path) => `Absoluter Pfad kopiert: ${path}`,
  pathCopyFailed: "Pfad konnte nicht kopiert werden",
  absolutePathMacOnly: "Das Kopieren absoluter Pfade ist nur in der macOS-Desktop-App verf\xFCgbar",
  codeBlockPlain: "Einfacher Codeblock (keine Sprache)",
  copyFolder: "Ordner kopieren",
  copyFile: "Datei kopieren",
  copyCurrentFile: "Aktuelle Datei kopieren",
  newFile: "Neu erstellen",
  newFolder: "Neuer Ordner",
  fileCreated: (path) => `Datei erstellt: ${path}`,
  fileCreateFailed: "Datei konnte nicht erstellt werden",
  folderCreated: (path) => `Ordner erstellt: ${path}`,
  folderCreateFailed: "Ordner konnte nicht erstellt werden",
  insertMarkdownCodeBlock: "Markdown-Codeblock einf\xFCgen",
  copyContent: "Inhalt kopieren",
  contentCopied: (name) => `Inhalt kopiert: ${name}`,
  contentCopyFailed: (name) => `Inhalt konnte nicht kopiert werden: ${name}`,
  copyFileMacOnly: "\u201EDatei kopieren\u201C ist nur in der macOS-Desktop-App verf\xFCgbar",
  localPathUnavailable: "Auf den lokalen Dateipfad kann nicht zugegriffen werden",
  fileCopied: (kind, name) => `${kind} kopiert: ${name}`,
  copyFailed: (name) => `Kopieren fehlgeschlagen: ${name}`,
  folderKind: "Ordner",
  fileKind: "Datei",
  copyCurrentDocumentContent: "Inhalt des aktuellen Dokuments kopieren",
  noCurrentDocument: "Kein aktuelles Dokument zum Kopieren vorhanden",
  explorerActions: "Dateiexplorer-Aktionen",
  explorerActionsDesc: "Sichtbare Schaltfl\xE4chen w\xE4hlen.",
  explorerObjectType: "Explorer-Element",
  explorerFolder: "Ordner",
  explorerMarkdown: "Markdown .md",
  explorerText: "Textdatei .txt",
  explorerOtherFiles: "Bilder, PDFs, Anh\xE4nge",
  toggleAllAction: (action) => `${action} f\xFCr alle unterst\xFCtzten Elementtypen umschalten`,
  toggleActionForObject: (action, objectType) => `${action} f\xFCr ${objectType} umschalten`,
  actionUnavailable: "Diese Aktion ist f\xFCr diesen Elementtyp nicht verf\xFCgbar",
  explorerMacOnlyNote: "Datei und absoluter Pfad nur unter macOS.",
  restoreExplorerActions: "Dateiexplorer-Aktionen wiederherstellen",
  restoreExplorerActionsDesc: "Empfohlene Schaltfl\xE4chen wiederherstellen.",
  restoreDefaults: "Standardwerte wiederherstellen",
  explorerActionsRestored: "Dateiexplorer-Aktionen wiederhergestellt",
  showCopyFileButton: "Schaltfl\xE4che zum Kopieren von Dateien anzeigen",
  showCopyFileButtonDesc: "Kopierschaltfl\xE4che in Datei-Zeilen anzeigen.",
  showCopyContentButton: "Schaltfl\xE4che zum Kopieren von Inhalten anzeigen",
  showCopyContentButtonDesc: "Inhaltskopie f\xFCr unterst\xFCtzte Dateien anzeigen.",
  showNewFileButton: "Schaltfl\xE4che f\xFCr neue Datei anzeigen",
  showNewFileButtonDesc: "Eine Schaltfl\xE4che zum Erstellen einer leeren Markdown-Datei in Ordnerzeilen anzeigen.",
  showCopyRelativePathButton: "Schaltfl\xE4che zum Kopieren relativer Pfade anzeigen",
  showCopyRelativePathButtonDesc: "Eine Schaltfl\xE4che zum Kopieren des Pfads relativ zum Vault-Stamm in Datei- und Ordnerzeilen anzeigen.",
  showCopyAbsolutePathButton: "Schaltfl\xE4che zum Kopieren absoluter Pfade anzeigen",
  showCopyAbsolutePathButtonDesc: "Eine Schaltfl\xE4che zum Kopieren des lokalen absoluten Pfads in Datei- und Ordnerzeilen anzeigen. Diese Funktion ist nur in der macOS-Desktop-App verf\xFCgbar.",
  documentContentArea: "Dokumentinhalt",
  documentContentAreaDesc: "Aktionen im ge\xF6ffneten Dokument.",
  showCopyDocumentButton: "Schaltfl\xE4che zum Kopieren des Dokuments anzeigen",
  showCopyDocumentButtonDesc: "Gesamtes Dokument kopieren.",
  codeBlockInsertion: "Codeblock einf\xFCgen",
  codeBlockInsertionDesc: "Codeblock einf\xFCgen oder umschlie\xDFen.",
  enableCodeBlockCommand: "Befehl zum Einf\xFCgen von Codebl\xF6cken aktivieren",
  enableCodeBlockCommandDesc: "Tastenk\xFCrzel zuweisen.",
  defaultCodeBlockLanguage: "Standardsprache f\xFCr Codebl\xF6cke",
  defaultCodeBlockLanguageDesc: "Sprache beim Einf\xFCgen.",
  customLanguage: (language) => `Benutzerdefiniert: ${language}`
};
var fr = {
  copyRelativePath: "Copier le chemin relatif",
  copyAbsolutePath: "Copier le chemin absolu",
  relativePathCopied: (path) => `Chemin relatif copi\xE9 : ${path}`,
  absolutePathCopied: (path) => `Chemin absolu copi\xE9 : ${path}`,
  pathCopyFailed: "Impossible de copier le chemin",
  absolutePathMacOnly: "La copie de chemin absolu est uniquement disponible dans l\u2019application de bureau macOS",
  codeBlockPlain: "Bloc de code simple (sans langage)",
  copyFolder: "Copier le dossier",
  copyFile: "Copier le fichier",
  copyCurrentFile: "Copier le fichier actuel",
  newFile: "Ajouter",
  newFolder: "Nouveau dossier",
  fileCreated: (path) => `Fichier cr\xE9\xE9 : ${path}`,
  fileCreateFailed: "Impossible de cr\xE9er le fichier",
  folderCreated: (path) => `Dossier cr\xE9\xE9 : ${path}`,
  folderCreateFailed: "Impossible de cr\xE9er le dossier",
  insertMarkdownCodeBlock: "Ins\xE9rer un bloc de code Markdown",
  copyContent: "Copier le contenu",
  contentCopied: (name) => `Contenu copi\xE9 : ${name}`,
  contentCopyFailed: (name) => `Impossible de copier le contenu : ${name}`,
  copyFileMacOnly: "La copie de fichier est uniquement disponible dans l\u2019application de bureau macOS",
  localPathUnavailable: "Impossible d\u2019acc\xE9der au chemin local du fichier",
  fileCopied: (kind, name) => `${kind} copi\xE9 : ${name}`,
  copyFailed: (name) => `\xC9chec de la copie : ${name}`,
  folderKind: "Dossier",
  fileKind: "Fichier",
  copyCurrentDocumentContent: "Copier le contenu du document actuel",
  noCurrentDocument: "Aucun document actuel \xE0 copier",
  explorerActions: "Actions de l\u2019explorateur de fichiers",
  explorerActionsDesc: "Choisissez les boutons visibles.",
  explorerObjectType: "\xC9l\xE9ment Explorer",
  explorerFolder: "Dossier",
  explorerMarkdown: "Markdown .md",
  explorerText: "Texte brut .txt",
  explorerOtherFiles: "Images, PDF, pi\xE8ces jointes",
  toggleAllAction: (action) => `Activer ou d\xE9sactiver ${action} pour tous les types compatibles`,
  toggleActionForObject: (action, objectType) => `Activer ou d\xE9sactiver ${action} pour ${objectType}`,
  actionUnavailable: "Cette action n\u2019est pas disponible pour ce type d\u2019\xE9l\xE9ment",
  explorerMacOnlyNote: "Copie de fichier et chemin absolu, macOS uniquement.",
  restoreExplorerActions: "Restaurer les actions de l\u2019explorateur",
  restoreExplorerActionsDesc: "Restaurer les boutons recommand\xE9s.",
  restoreDefaults: "Restaurer les valeurs par d\xE9faut",
  explorerActionsRestored: "Actions de l\u2019explorateur restaur\xE9es",
  showCopyFileButton: "Afficher le bouton de copie de fichier",
  showCopyFileButtonDesc: "Afficher la copie dans les lignes de fichier.",
  showCopyContentButton: "Afficher le bouton de copie du contenu",
  showCopyContentButtonDesc: "Afficher la copie du contenu pour les fichiers pris en charge.",
  showNewFileButton: "Afficher le bouton Nouveau fichier",
  showNewFileButtonDesc: "Afficher un bouton pour cr\xE9er un fichier Markdown vide dans les lignes de dossier.",
  showCopyRelativePathButton: "Afficher le bouton de copie du chemin relatif",
  showCopyRelativePathButtonDesc: "Afficher un bouton pour copier le chemin relatif \xE0 la racine du coffre dans les lignes de fichiers et dossiers.",
  showCopyAbsolutePathButton: "Afficher le bouton de copie du chemin absolu",
  showCopyAbsolutePathButtonDesc: "Afficher un bouton pour copier le chemin absolu local dans les lignes de fichiers et dossiers. Cette fonction est uniquement disponible dans l\u2019application de bureau macOS.",
  documentContentArea: "Zone de contenu du document",
  documentContentAreaDesc: "Actions du document ouvert.",
  showCopyDocumentButton: "Afficher le bouton de copie du document",
  showCopyDocumentButtonDesc: "Copier tout le document.",
  codeBlockInsertion: "Insertion de bloc de code",
  codeBlockInsertionDesc: "Ins\xE9rer ou entourer un bloc de code.",
  enableCodeBlockCommand: "Activer la commande d\u2019insertion de bloc de code",
  enableCodeBlockCommandDesc: "Attribuer un raccourci.",
  defaultCodeBlockLanguage: "Langage de bloc de code par d\xE9faut",
  defaultCodeBlockLanguageDesc: "Langage lors de l\u2019insertion.",
  customLanguage: (language) => `Personnalis\xE9 : ${language}`
};
var es = {
  copyRelativePath: "Copiar ruta relativa",
  copyAbsolutePath: "Copiar ruta absoluta",
  relativePathCopied: (path) => `Ruta relativa copiada: ${path}`,
  absolutePathCopied: (path) => `Ruta absoluta copiada: ${path}`,
  pathCopyFailed: "No se pudo copiar la ruta",
  absolutePathMacOnly: "Copiar la ruta absoluta solo est\xE1 disponible en la aplicaci\xF3n de escritorio para macOS",
  codeBlockPlain: "Bloque de c\xF3digo simple (sin lenguaje)",
  copyFolder: "Copiar carpeta",
  copyFile: "Copiar archivo",
  copyCurrentFile: "Copiar archivo actual",
  newFile: "A\xF1adir",
  newFolder: "Nueva carpeta",
  fileCreated: (path) => `Archivo creado: ${path}`,
  fileCreateFailed: "No se pudo crear el archivo",
  folderCreated: (path) => `Carpeta creada: ${path}`,
  folderCreateFailed: "No se pudo crear la carpeta",
  insertMarkdownCodeBlock: "Insertar bloque de c\xF3digo Markdown",
  copyContent: "Copiar contenido",
  contentCopied: (name) => `Contenido copiado: ${name}`,
  contentCopyFailed: (name) => `No se pudo copiar el contenido: ${name}`,
  copyFileMacOnly: "Copiar archivos solo est\xE1 disponible en la aplicaci\xF3n de escritorio para macOS",
  localPathUnavailable: "No se puede acceder a la ruta local del archivo",
  fileCopied: (_kind, name) => `Se copi\xF3: ${name}`,
  copyFailed: (name) => `Error al copiar: ${name}`,
  folderKind: "Carpeta",
  fileKind: "Archivo",
  copyCurrentDocumentContent: "Copiar el contenido del documento actual",
  noCurrentDocument: "No hay ning\xFAn documento actual para copiar",
  explorerActions: "Acciones del explorador de archivos",
  explorerActionsDesc: "Elige los botones visibles.",
  explorerObjectType: "Elemento de Explore",
  explorerFolder: "Carpeta",
  explorerMarkdown: "Markdown .md",
  explorerText: "Texto sin formato .txt",
  explorerOtherFiles: "Im\xE1genes, PDF, adjuntos",
  toggleAllAction: (action) => `Alternar ${action} para todos los tipos compatibles`,
  toggleActionForObject: (action, objectType) => `Alternar ${action} para ${objectType}`,
  actionUnavailable: "Esta acci\xF3n no est\xE1 disponible para este tipo de elemento",
  explorerMacOnlyNote: "Copiar archivo y ruta absoluta solo en macOS.",
  restoreExplorerActions: "Restaurar acciones del explorador",
  restoreExplorerActionsDesc: "Restaurar botones recomendados.",
  restoreDefaults: "Restaurar valores predeterminados",
  explorerActionsRestored: "Acciones del explorador restauradas",
  showCopyFileButton: "Mostrar bot\xF3n para copiar archivos",
  showCopyFileButtonDesc: "Muestra el bot\xF3n en las filas de archivos.",
  showCopyContentButton: "Mostrar bot\xF3n para copiar contenido",
  showCopyContentButtonDesc: "Muestra la copia de contenido para archivos compatibles.",
  showNewFileButton: "Mostrar bot\xF3n de archivo nuevo",
  showNewFileButtonDesc: "Muestra un bot\xF3n para crear un archivo Markdown vac\xEDo en las filas de carpetas.",
  showCopyRelativePathButton: "Mostrar bot\xF3n para copiar ruta relativa",
  showCopyRelativePathButtonDesc: "Muestra un bot\xF3n para copiar la ruta relativa a la ra\xEDz de la b\xF3veda en las filas de archivos y carpetas.",
  showCopyAbsolutePathButton: "Mostrar bot\xF3n para copiar ruta absoluta",
  showCopyAbsolutePathButtonDesc: "Muestra un bot\xF3n para copiar la ruta absoluta local en las filas de archivos y carpetas. Esta funci\xF3n solo est\xE1 disponible en la aplicaci\xF3n de escritorio para macOS.",
  documentContentArea: "\xC1rea de contenido del documento",
  documentContentAreaDesc: "Acciones del documento abierto.",
  showCopyDocumentButton: "Mostrar bot\xF3n para copiar el documento",
  showCopyDocumentButtonDesc: "Copia todo el documento.",
  codeBlockInsertion: "Inserci\xF3n de bloques de c\xF3digo",
  codeBlockInsertionDesc: "Inserta o envuelve un bloque de c\xF3digo.",
  enableCodeBlockCommand: "Activar comando para insertar bloques de c\xF3digo",
  enableCodeBlockCommandDesc: "Asigna un atajo.",
  defaultCodeBlockLanguage: "Lenguaje predeterminado del bloque de c\xF3digo",
  defaultCodeBlockLanguageDesc: "Lenguaje al insertar.",
  customLanguage: (language) => `Personalizado: ${language}`
};
var ptBR = {
  copyRelativePath: "Copiar caminho relativo",
  copyAbsolutePath: "Copiar caminho absoluto",
  relativePathCopied: (path) => `Caminho relativo copiado: ${path}`,
  absolutePathCopied: (path) => `Caminho absoluto copiado: ${path}`,
  pathCopyFailed: "N\xE3o foi poss\xEDvel copiar o caminho",
  absolutePathMacOnly: "Copiar o caminho absoluto s\xF3 est\xE1 dispon\xEDvel no aplicativo para macOS",
  codeBlockPlain: "Bloco de c\xF3digo simples (sem linguagem)",
  copyFolder: "Copiar pasta",
  copyFile: "Copiar arquivo",
  copyCurrentFile: "Copiar arquivo atual",
  newFile: "Adicionar",
  newFolder: "Nova pasta",
  fileCreated: (path) => `Arquivo criado: ${path}`,
  fileCreateFailed: "N\xE3o foi poss\xEDvel criar o arquivo",
  folderCreated: (path) => `Pasta criada: ${path}`,
  folderCreateFailed: "N\xE3o foi poss\xEDvel criar a pasta",
  insertMarkdownCodeBlock: "Inserir bloco de c\xF3digo Markdown",
  copyContent: "Copiar conte\xFAdo",
  contentCopied: (name) => `Conte\xFAdo copiado: ${name}`,
  contentCopyFailed: (name) => `N\xE3o foi poss\xEDvel copiar o conte\xFAdo: ${name}`,
  copyFileMacOnly: "Copiar arquivos s\xF3 est\xE1 dispon\xEDvel no aplicativo para macOS",
  localPathUnavailable: "N\xE3o foi poss\xEDvel acessar o caminho local do arquivo",
  fileCopied: (_kind, name) => `C\xF3pia conclu\xEDda: ${name}`,
  copyFailed: (name) => `Falha ao copiar: ${name}`,
  folderKind: "Pasta",
  fileKind: "Arquivo",
  copyCurrentDocumentContent: "Copiar conte\xFAdo do documento atual",
  noCurrentDocument: "N\xE3o h\xE1 um documento atual para copiar",
  explorerActions: "A\xE7\xF5es do explorador de arquivos",
  explorerActionsDesc: "Escolha os bot\xF5es vis\xEDveis.",
  explorerObjectType: "Item do Explore",
  explorerFolder: "Pasta",
  explorerMarkdown: "Markdown .md",
  explorerText: "Texto simples .txt",
  explorerOtherFiles: "Imagens, PDFs, anexos",
  toggleAllAction: (action) => `Alternar ${action} para todos os tipos compat\xEDveis`,
  toggleActionForObject: (action, objectType) => `Alternar ${action} para ${objectType}`,
  actionUnavailable: "Esta a\xE7\xE3o n\xE3o est\xE1 dispon\xEDvel para este tipo de item",
  explorerMacOnlyNote: "Copiar arquivo e caminho absoluto, apenas no macOS.",
  restoreExplorerActions: "Restaurar a\xE7\xF5es do explorador",
  restoreExplorerActionsDesc: "Restaurar bot\xF5es recomendados.",
  restoreDefaults: "Restaurar padr\xF5es",
  explorerActionsRestored: "A\xE7\xF5es do explorador restauradas",
  showCopyFileButton: "Mostrar bot\xE3o de copiar arquivo",
  showCopyFileButtonDesc: "Mostre o bot\xE3o nas linhas de arquivo.",
  showCopyContentButton: "Mostrar bot\xE3o de copiar conte\xFAdo",
  showCopyContentButtonDesc: "Mostre a c\xF3pia de conte\xFAdo para arquivos compat\xEDveis.",
  showNewFileButton: "Mostrar bot\xE3o de novo arquivo",
  showNewFileButtonDesc: "Mostre um bot\xE3o para criar um arquivo Markdown em branco nas linhas de pastas.",
  showCopyRelativePathButton: "Mostrar bot\xE3o de copiar caminho relativo",
  showCopyRelativePathButtonDesc: "Mostre um bot\xE3o para copiar o caminho relativo \xE0 raiz do cofre nas linhas de arquivos e pastas.",
  showCopyAbsolutePathButton: "Mostrar bot\xE3o de copiar caminho absoluto",
  showCopyAbsolutePathButtonDesc: "Mostre um bot\xE3o para copiar o caminho absoluto local nas linhas de arquivos e pastas. Este recurso s\xF3 est\xE1 dispon\xEDvel no aplicativo para macOS.",
  documentContentArea: "\xC1rea de conte\xFAdo do documento",
  documentContentAreaDesc: "A\xE7\xF5es do documento aberto.",
  showCopyDocumentButton: "Mostrar bot\xE3o de copiar documento",
  showCopyDocumentButtonDesc: "Copie o documento inteiro.",
  codeBlockInsertion: "Inser\xE7\xE3o de bloco de c\xF3digo",
  codeBlockInsertionDesc: "Insira ou envolva um bloco de c\xF3digo.",
  enableCodeBlockCommand: "Ativar comando de inser\xE7\xE3o de bloco de c\xF3digo",
  enableCodeBlockCommandDesc: "Atribua um atalho.",
  defaultCodeBlockLanguage: "Linguagem padr\xE3o do bloco de c\xF3digo",
  defaultCodeBlockLanguageDesc: "Linguagem ao inserir.",
  customLanguage: (language) => `Personalizado: ${language}`
};
var translations = {
  en,
  zh,
  "zh-tw": zhTW,
  ja,
  ko,
  de,
  fr,
  es,
  "pt-br": ptBR
};
function getTranslation(language = (0, import_obsidian.getLanguage)()) {
  var _a;
  const locale = language.toLowerCase().replace("_", "-");
  if (translations[locale]) return translations[locale];
  if (locale.startsWith("zh-tw") || locale.startsWith("zh-hant")) return zhTW;
  if (locale.startsWith("pt-br")) return ptBR;
  return (_a = translations[locale.split("-")[0]]) != null ? _a : en;
}

// main.ts
var OSASCRIPT = "/usr/bin/osascript";
var EXPLORER_OBJECT_TYPES = ["folder", "markdown", "text", "other"];
var EXPLORER_ACTIONS = [
  "copyFile",
  "addNew",
  "addNewFolder",
  "copyRelativePath",
  "copyAbsolutePath",
  "copyContent"
];
var SUPPORTED_EXPLORER_ACTIONS = {
  folder: [
    "copyFile",
    "addNew",
    "addNewFolder",
    "copyRelativePath",
    "copyAbsolutePath"
  ],
  markdown: [
    "copyFile",
    "copyRelativePath",
    "copyAbsolutePath",
    "copyContent"
  ],
  text: [
    "copyFile",
    "copyRelativePath",
    "copyAbsolutePath",
    "copyContent"
  ],
  other: ["copyFile", "copyRelativePath", "copyAbsolutePath"]
};
function createDefaultExplorerActionVisibility() {
  return {
    folder: {
      copyFile: true,
      addNew: true,
      addNewFolder: true,
      copyRelativePath: false,
      copyAbsolutePath: false,
      copyContent: false
    },
    markdown: {
      copyFile: true,
      addNew: false,
      addNewFolder: false,
      copyRelativePath: false,
      copyAbsolutePath: false,
      copyContent: true
    },
    text: {
      copyFile: true,
      addNew: false,
      addNewFolder: false,
      copyRelativePath: false,
      copyAbsolutePath: false,
      copyContent: true
    },
    other: {
      copyFile: true,
      addNew: false,
      addNewFolder: false,
      copyRelativePath: false,
      copyAbsolutePath: false,
      copyContent: false
    }
  };
}
var DEFAULT_SETTINGS = {
  explorerActionVisibility: createDefaultExplorerActionVisibility(),
  enableEditorContentCopyButton: true,
  enableInsertCodeBlockCommand: true,
  defaultCodeBlockLanguage: ""
};
var CODE_BLOCK_LANGUAGE_OPTIONS = {
  markdown: "Markdown",
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  json: "JSON",
  yaml: "YAML",
  bash: "Shell / Bash",
  html: "HTML",
  css: "CSS",
  sql: "SQL"
};
var COPY_FILE_APPLESCRIPT = [
  'use framework "Foundation"',
  'use framework "AppKit"',
  "use scripting additions",
  "on run argv",
  "    set thePath to item 1 of argv",
  "    set theURL to current application's |NSURL|'s fileURLWithPath:thePath",
  "    set pb to current application's NSPasteboard's generalPasteboard()",
  "    pb's clearContents()",
  "    pb's writeObjects:{theURL}",
  "end run"
].join("\n");
var CopyFileMacOSPlugin = class extends import_obsidian2.Plugin {
  async onload() {
    this.t = getTranslation();
    this.removeLegacyBackgroundElements();
    await this.loadSettings();
    this.addSettingTab(new SuperCopySettingTab(this.app, this));
    this.refreshAllFeatures();
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!(file instanceof import_obsidian2.TFile) && !(file instanceof import_obsidian2.TFolder)) {
          return;
        }
        const title = file instanceof import_obsidian2.TFolder ? this.t.copyFolder : this.t.copyFile;
        menu.addItem((item) => {
          item.setTitle(title).setIcon("files").onClick(() => {
            void this.copyFileToClipboard(file);
          });
        });
      })
    );
    this.addCommand({
      id: "copy-current-file",
      name: this.t.copyCurrentFile,
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file) {
          return false;
        }
        if (!checking) {
          void this.copyFileToClipboard(file);
        }
        return true;
      }
    });
    this.addCommand({
      id: "insert-markdown-code-block",
      name: this.t.insertMarkdownCodeBlock,
      editorCheckCallback: (checking, editor) => {
        if (!this.settings.enableInsertCodeBlockCommand) {
          return false;
        }
        if (!checking) {
          this.insertMarkdownCodeBlock(editor);
        }
        return true;
      }
    });
    try {
      this.registerExtensions(["txt"], "markdown");
    } catch (err) {
      console.warn("Super Copy: could not register .txt extension:", err);
    }
    this.registerDomEvent(document, "pointerover", (evt) => {
      var _a;
      const target = evt.target;
      const titleEl = (_a = target == null ? void 0 : target.closest) == null ? void 0 : _a.call(
        target,
        ".nav-file-title, .nav-folder-title"
      );
      if (!titleEl || titleEl.querySelector(".cfm-actions")) {
        return;
      }
      const path = titleEl.getAttribute("data-path");
      if (!path) {
        return;
      }
      const file = this.app.vault.getAbstractFileByPath(path);
      if (file instanceof import_obsidian2.TFile || file instanceof import_obsidian2.TFolder) {
        this.injectRowButtons(titleEl, file);
      }
    });
    this.registerEvent(
      this.app.workspace.on("layout-change", () => {
        this.refreshEditorEnhancements();
      })
    );
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", () => {
        this.refreshEditorEnhancements();
      })
    );
    this.registerEvent(
      this.app.workspace.on("file-open", () => {
        this.refreshEditorEnhancements();
      })
    );
    this.registerDomEvent(window, "resize", () => {
      this.refreshEditorEnhancements();
    });
    this.app.workspace.onLayoutReady(() => {
      this.refreshAllFeatures();
    });
  }
  async loadSettings() {
    var _a, _b, _c;
    const savedData = await this.loadData();
    const savedSettings = savedData && typeof savedData === "object" ? savedData : {};
    this.settings = {
      explorerActionVisibility: this.normalizeExplorerActionVisibility(savedSettings),
      enableEditorContentCopyButton: (_a = savedSettings.enableEditorContentCopyButton) != null ? _a : DEFAULT_SETTINGS.enableEditorContentCopyButton,
      enableInsertCodeBlockCommand: (_b = savedSettings.enableInsertCodeBlockCommand) != null ? _b : DEFAULT_SETTINGS.enableInsertCodeBlockCommand,
      defaultCodeBlockLanguage: (_c = savedSettings.defaultCodeBlockLanguage) != null ? _c : DEFAULT_SETTINGS.defaultCodeBlockLanguage
    };
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  removeLegacyBackgroundElements() {
    document.body.removeClass("cfm-content-background-enabled");
    document.querySelectorAll(".cfm-editor-content-panel").forEach((panel) => panel.remove());
  }
  refreshAllFeatures() {
    this.refreshExplorerButtons();
    this.refreshEditorEnhancements();
  }
  normalizeExplorerActionVisibility(savedSettings) {
    var _a;
    const visibility = createDefaultExplorerActionVisibility();
    const savedVisibility = savedSettings.explorerActionVisibility;
    const legacyActionValues = {
      copyFile: savedSettings.enableExplorerFileCopy,
      addNew: savedSettings.enableExplorerNewFile,
      addNewFolder: void 0,
      copyRelativePath: savedSettings.enableExplorerRelativePathCopy,
      copyAbsolutePath: savedSettings.enableExplorerAbsolutePathCopy,
      copyContent: savedSettings.enableExplorerContentCopy
    };
    for (const objectType of EXPLORER_OBJECT_TYPES) {
      for (const action of EXPLORER_ACTIONS) {
        if (!this.isExplorerActionSupported(objectType, action)) {
          visibility[objectType][action] = false;
          continue;
        }
        const savedValue = (_a = savedVisibility == null ? void 0 : savedVisibility[objectType]) == null ? void 0 : _a[action];
        if (typeof savedValue === "boolean") {
          visibility[objectType][action] = savedValue;
        } else if (typeof legacyActionValues[action] === "boolean") {
          visibility[objectType][action] = legacyActionValues[action];
        }
      }
    }
    return visibility;
  }
  isExplorerActionSupported(objectType, action) {
    return SUPPORTED_EXPLORER_ACTIONS[objectType].includes(action);
  }
  getExplorerObjectType(file) {
    if (file instanceof import_obsidian2.TFolder) return "folder";
    if (file.extension === "md") return "markdown";
    if (file.extension === "txt") return "text";
    return "other";
  }
  isExplorerActionEnabled(file, action) {
    return this.settings.explorerActionVisibility[this.getExplorerObjectType(file)][action];
  }
  /** Build the hover button group for one file or folder row. */
  injectRowButtons(titleEl, file) {
    const actions = titleEl.createDiv({ cls: "cfm-actions" });
    if (this.isExplorerActionEnabled(file, "copyFile")) {
      const label = file instanceof import_obsidian2.TFolder ? this.t.copyFolder : this.t.copyFile;
      this.makeActionButton(actions, "files", label, () => {
        void this.copyFileToClipboard(file);
      });
    }
    if (this.isExplorerActionEnabled(file, "addNew") && file instanceof import_obsidian2.TFolder) {
      this.makeActionButton(actions, "file-plus", this.t.newFile, () => {
        void this.createFileInFolder(file);
      });
    }
    if (this.isExplorerActionEnabled(file, "addNewFolder") && file instanceof import_obsidian2.TFolder) {
      this.makeActionButton(actions, "folder-plus", this.t.newFolder, () => {
        void this.createFolderInFolder(file);
      });
    }
    if (this.isExplorerActionEnabled(file, "copyContent") && this.isTextDocument(file)) {
      this.makeActionButton(actions, "copy", this.t.copyContent, () => {
        void this.copyFileContent(file);
      });
    }
    if (this.isExplorerActionEnabled(file, "copyRelativePath")) {
      this.makeActionButton(actions, "folder-tree", this.t.copyRelativePath, () => {
        void this.copyRelativePath(file);
      });
    }
    if (this.isExplorerActionEnabled(file, "copyAbsolutePath")) {
      this.makeActionButton(actions, "file-code-2", this.t.copyAbsolutePath, () => {
        void this.copyAbsolutePath(file);
      });
    }
    titleEl.style.setProperty(
      "--cfm-action-count",
      String(actions.childElementCount)
    );
  }
  makeActionButton(parent, icon, label, onClick) {
    const btn = parent.createEl("button", {
      cls: "cfm-action-btn",
      attr: { "aria-label": label }
    });
    (0, import_obsidian2.setIcon)(btn, icon);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    });
  }
  async copyFileContent(file) {
    try {
      const content = await this.app.vault.cachedRead(file);
      await this.writeTextToClipboard(content);
      new import_obsidian2.Notice(this.t.contentCopied(file.name));
    } catch (err) {
      console.error("Copy File (macOS) \u2014 copy content failed:", err);
      new import_obsidian2.Notice(this.t.contentCopyFailed(file.name));
    }
  }
  async createFileInFolder(folder) {
    const filePath = this.getNewFilePath(folder);
    try {
      const file = await this.app.vault.create(filePath, "");
      await this.app.workspace.getLeaf(false).openFile(file);
      new import_obsidian2.Notice(this.t.fileCreated(file.path));
    } catch (err) {
      console.error("Super Copy \u2014 create file failed:", err);
      new import_obsidian2.Notice(this.t.fileCreateFailed);
    }
  }
  async createFolderInFolder(parent) {
    const folderPath = this.getNewFolderPath(parent);
    try {
      const folder = await this.app.vault.createFolder(folderPath);
      this.tryStartExplorerRename(folder);
      new import_obsidian2.Notice(this.t.folderCreated(folder.path));
    } catch (err) {
      console.error("Super Copy \u2014 create folder failed:", err);
      new import_obsidian2.Notice(this.t.folderCreateFailed);
    }
  }
  async copyRelativePath(file) {
    const relativePath = file.path || "/";
    try {
      await this.writeTextToClipboard(relativePath);
      new import_obsidian2.Notice(this.t.relativePathCopied(relativePath));
    } catch (err) {
      console.error("Super Copy \u2014 copy relative path failed:", err);
      new import_obsidian2.Notice(this.t.pathCopyFailed);
    }
  }
  async copyAbsolutePath(file) {
    if (!import_obsidian2.Platform.isMacOS || !import_obsidian2.Platform.isDesktop) {
      new import_obsidian2.Notice(this.t.absolutePathMacOnly);
      return;
    }
    const adapter = this.app.vault.adapter;
    if (!(adapter instanceof import_obsidian2.FileSystemAdapter)) {
      new import_obsidian2.Notice(this.t.localPathUnavailable);
      return;
    }
    const absolutePath = adapter.getFullPath(file.path);
    try {
      await this.writeTextToClipboard(absolutePath);
      new import_obsidian2.Notice(this.t.absolutePathCopied(absolutePath));
    } catch (err) {
      console.error("Super Copy \u2014 copy absolute path failed:", err);
      new import_obsidian2.Notice(this.t.pathCopyFailed);
    }
  }
  getNewFilePath(folder) {
    const basePath = folder.path ? `${folder.path}/Untitled` : "Untitled";
    let suffix = 0;
    let filePath = `${basePath}.md`;
    while (this.app.vault.getAbstractFileByPath(filePath)) {
      suffix += 1;
      filePath = `${basePath} ${suffix}.md`;
    }
    return filePath;
  }
  getNewFolderPath(folder) {
    const basePath = folder.path ? `${folder.path}/Untitled` : "Untitled";
    let suffix = 0;
    let folderPath = basePath;
    while (this.app.vault.getAbstractFileByPath(folderPath)) {
      suffix += 1;
      folderPath = `${basePath} ${suffix}`;
    }
    return folderPath;
  }
  tryStartExplorerRename(file) {
    const leaf = this.app.workspace.getLeavesOfType("file-explorer")[0];
    const view = leaf == null ? void 0 : leaf.view;
    if (typeof (view == null ? void 0 : view.startRenameFile) === "function") {
      view.startRenameFile(file);
    }
  }
  async copyFileToClipboard(file) {
    if (!import_obsidian2.Platform.isMacOS || !import_obsidian2.Platform.isDesktop) {
      new import_obsidian2.Notice(this.t.copyFileMacOnly);
      return;
    }
    const adapter = this.app.vault.adapter;
    if (!(adapter instanceof import_obsidian2.FileSystemAdapter)) {
      new import_obsidian2.Notice(this.t.localPathUnavailable);
      return;
    }
    const fullPath = adapter.getFullPath(file.path);
    const kind = file instanceof import_obsidian2.TFolder ? this.t.folderKind : this.t.fileKind;
    try {
      await this.runOsascript(fullPath);
      new import_obsidian2.Notice(this.t.fileCopied(kind, file.name));
    } catch (err) {
      console.error("Copy File (macOS) failed:", err);
      new import_obsidian2.Notice(this.t.copyFailed(file.name));
    }
  }
  runOsascript(filePath) {
    return new Promise((resolve, reject) => {
      (0, import_child_process.execFile)(
        OSASCRIPT,
        ["-e", COPY_FILE_APPLESCRIPT, filePath],
        (error, _stdout, stderr) => {
          if (error) {
            reject(new Error(stderr || error.message));
            return;
          }
          resolve();
        }
      );
    });
  }
  async writeTextToClipboard(content) {
    var _a;
    if (!((_a = navigator.clipboard) == null ? void 0 : _a.writeText)) {
      throw new Error("Clipboard API is not available");
    }
    await navigator.clipboard.writeText(content);
  }
  refreshExplorerButtons() {
    document.querySelectorAll(".cfm-actions").forEach((el) => el.remove());
    document.querySelectorAll(".nav-file-title, .nav-folder-title").forEach((el) => el.style.removeProperty("--cfm-action-count"));
  }
  insertMarkdownCodeBlock(editor) {
    const language = this.settings.defaultCodeBlockLanguage.trim();
    const fenceStart = `\`\`\`${language}`;
    const selection = editor.getSelection();
    if (selection) {
      editor.replaceSelection(`${fenceStart}
${selection}
\`\`\``);
      return;
    }
    const cursor = editor.getCursor();
    editor.replaceRange(`${fenceStart}

\`\`\``, cursor);
    editor.setCursor({
      line: cursor.line + 1,
      ch: 0
    });
  }
  refreshEditorEnhancements() {
    document.querySelectorAll(
      ".workspace-leaf-content[data-type='markdown'] .view-content"
    ).forEach((contentEl) => {
      const contentBounds = this.getRenderedContentBounds(contentEl);
      const existingButton = contentEl.querySelector(
        ".cfm-editor-copy-btn"
      );
      if (!this.settings.enableEditorContentCopyButton || !contentBounds) {
        existingButton == null ? void 0 : existingButton.remove();
        return;
      }
      const btn = existingButton != null ? existingButton : contentEl.createEl("button", {
        cls: "cfm-editor-copy-btn",
        attr: { "aria-label": this.t.copyCurrentDocumentContent }
      });
      if (!existingButton) {
        (0, import_obsidian2.setIcon)(btn, "copy");
        btn.addEventListener("click", (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          const file = this.getFileForContentEl(contentEl);
          if (!file) {
            new import_obsidian2.Notice(this.t.noCurrentDocument);
            return;
          }
          void this.copyFileContent(file);
        });
      }
      btn.style.top = `${contentBounds.top + 8}px`;
      btn.style.left = `${contentBounds.left + contentBounds.width - 36}px`;
    });
  }
  getRenderedContentBounds(contentEl) {
    var _a;
    const viewRect = contentEl.getBoundingClientRect();
    const columnEl = contentEl.querySelector(
      [
        ".markdown-preview-sizer",
        ".markdown-source-view.mod-cm6 .cm-contentContainer",
        ".markdown-source-view .cm-contentContainer",
        ".markdown-source-view .cm-sizer"
      ].join(", ")
    );
    const firstContentEl = this.getFirstRenderedContentEl(contentEl);
    if (!columnEl || !firstContentEl) {
      return null;
    }
    const columnRect = columnEl.getBoundingClientRect();
    const firstRect = firstContentEl.getBoundingClientRect();
    const titleRect = (_a = contentEl.querySelector(".inline-title, .mod-header")) == null ? void 0 : _a.getBoundingClientRect();
    const topPadding = 18;
    const gapAfterTitle = 12;
    const titleBottom = titleRect ? titleRect.bottom - viewRect.top : 0;
    const contentTop = firstRect.top - viewRect.top;
    const top = Math.max(contentTop - topPadding, titleBottom + gapAfterTitle);
    return {
      top,
      left: columnRect.left - viewRect.left,
      width: columnRect.width
    };
  }
  getFirstRenderedContentEl(contentEl) {
    var _a;
    const candidates = Array.from(
      contentEl.querySelectorAll(
        [
          ".markdown-preview-section > div[class^='el-']",
          ".markdown-preview-section > p",
          ".markdown-preview-section > ul",
          ".markdown-preview-section > ol",
          ".markdown-preview-section > pre",
          ".markdown-preview-section > blockquote",
          ".markdown-source-view .cm-content"
        ].join(", ")
      )
    );
    return (_a = candidates.find((el) => {
      if (el.matches(".mod-header, .inline-title")) {
        return false;
      }
      if (el.querySelector(".inline-title")) {
        return false;
      }
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    })) != null ? _a : null;
  }
  getFileForContentEl(contentEl) {
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      if (leaf.view instanceof import_obsidian2.MarkdownView && leaf.view.containerEl.contains(contentEl)) {
        return leaf.view.file;
      }
    }
    return this.app.workspace.getActiveFile();
  }
  isTextDocument(file) {
    return file instanceof import_obsidian2.TFile && ["md", "txt"].includes(file.extension);
  }
};
var SuperCopySettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    const { t } = this.plugin;
    containerEl.empty();
    this.createSection(
      containerEl,
      t.explorerActions,
      t.explorerActionsDesc
    );
    this.createExplorerActionMatrix(containerEl);
    containerEl.createDiv({
      cls: "cfm-settings-platform-note",
      text: t.explorerMacOnlyNote
    });
    new import_obsidian2.Setting(containerEl).setName(t.restoreExplorerActions).setDesc(t.restoreExplorerActionsDesc).addButton(
      (button) => button.setButtonText(t.restoreDefaults).onClick(async () => {
        this.plugin.settings.explorerActionVisibility = createDefaultExplorerActionVisibility();
        await this.plugin.saveSettings();
        this.plugin.refreshAllFeatures();
        new import_obsidian2.Notice(t.explorerActionsRestored);
        this.display();
      })
    );
    this.createSection(
      containerEl,
      t.documentContentArea,
      t.documentContentAreaDesc
    );
    new import_obsidian2.Setting(containerEl).setName(t.showCopyDocumentButton).setDesc(t.showCopyDocumentButtonDesc).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.enableEditorContentCopyButton).onChange(async (value) => {
        this.plugin.settings.enableEditorContentCopyButton = value;
        await this.plugin.saveSettings();
        this.plugin.refreshAllFeatures();
      })
    );
    this.createSection(
      containerEl,
      t.codeBlockInsertion,
      t.codeBlockInsertionDesc
    );
    new import_obsidian2.Setting(containerEl).setName(t.enableCodeBlockCommand).setDesc(t.enableCodeBlockCommandDesc).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.enableInsertCodeBlockCommand).onChange(async (value) => {
        this.plugin.settings.enableInsertCodeBlockCommand = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t.defaultCodeBlockLanguage).setDesc(t.defaultCodeBlockLanguageDesc).addDropdown((dropdown) => {
      dropdown.addOption("", t.codeBlockPlain);
      for (const [value, label] of Object.entries(CODE_BLOCK_LANGUAGE_OPTIONS)) {
        dropdown.addOption(value, label);
      }
      const current = this.plugin.settings.defaultCodeBlockLanguage;
      if (current !== "" && !(current in CODE_BLOCK_LANGUAGE_OPTIONS)) {
        dropdown.addOption(current, t.customLanguage(current));
      }
      dropdown.setValue(current).onChange(async (value) => {
        this.plugin.settings.defaultCodeBlockLanguage = value;
        await this.plugin.saveSettings();
      });
    });
  }
  createExplorerActionMatrix(containerEl) {
    var _a;
    const { t } = this.plugin;
    const wrapper = containerEl.createDiv({ cls: "cfm-settings-matrix-wrap" });
    const table = wrapper.createEl("table", { cls: "cfm-settings-matrix" });
    const headerRow = table.createEl("thead").createEl("tr");
    headerRow.createEl("th", {
      text: t.explorerObjectType,
      attr: { scope: "col" }
    });
    const headerCheckboxes = /* @__PURE__ */ new Map();
    const cellCheckboxes = /* @__PURE__ */ new Map();
    for (const action of EXPLORER_ACTIONS) {
      cellCheckboxes.set(action, /* @__PURE__ */ new Map());
      const headerCell = headerRow.createEl("th", { attr: { scope: "col" } });
      const isAvailable = this.isExplorerActionAvailableOnPlatform(action);
      headerCell.createDiv({
        cls: "cfm-settings-matrix-heading",
        text: this.getExplorerActionLabel(action)
      });
      const checkboxLabel = headerCell.createEl("label", {
        cls: "cfm-settings-checkbox-hitbox",
        attr: {
          title: isAvailable ? t.toggleAllAction(this.getExplorerActionLabel(action)) : t.explorerMacOnlyNote
        }
      });
      const checkbox = checkboxLabel.createEl("input", {
        attr: {
          type: "checkbox",
          "aria-label": t.toggleAllAction(
            this.getExplorerActionLabel(action)
          )
        }
      });
      checkbox.disabled = !isAvailable;
      headerCheckboxes.set(action, checkbox);
      checkbox.addEventListener("change", () => {
        void this.setExplorerActionColumn(
          action,
          checkbox.checked,
          cellCheckboxes,
          headerCheckboxes
        );
      });
    }
    const body = table.createEl("tbody");
    for (const objectType of EXPLORER_OBJECT_TYPES) {
      const row = body.createEl("tr");
      row.createEl("th", {
        text: this.getExplorerObjectTypeLabel(objectType),
        attr: { scope: "row" }
      });
      for (const action of EXPLORER_ACTIONS) {
        const cell = row.createEl("td");
        if (!this.plugin.isExplorerActionSupported(objectType, action)) {
          cell.createSpan({
            cls: "cfm-settings-unavailable",
            text: "-",
            attr: { title: t.actionUnavailable }
          });
          continue;
        }
        const actionLabel = this.getExplorerActionLabel(action);
        const objectLabel = this.getExplorerObjectTypeLabel(objectType);
        const isAvailable = this.isExplorerActionAvailableOnPlatform(action);
        const label = cell.createEl("label", {
          cls: "cfm-settings-checkbox-hitbox",
          attr: {
            title: isAvailable ? t.toggleActionForObject(actionLabel, objectLabel) : t.explorerMacOnlyNote
          }
        });
        const checkbox = label.createEl("input", {
          attr: {
            type: "checkbox",
            "aria-label": t.toggleActionForObject(
              actionLabel,
              objectLabel
            )
          }
        });
        checkbox.checked = this.plugin.settings.explorerActionVisibility[objectType][action];
        checkbox.disabled = !isAvailable;
        (_a = cellCheckboxes.get(action)) == null ? void 0 : _a.set(objectType, checkbox);
        checkbox.addEventListener("change", () => {
          this.plugin.settings.explorerActionVisibility[objectType][action] = checkbox.checked;
          this.syncExplorerActionColumnHeader(action, headerCheckboxes);
          void this.persistExplorerActionVisibility();
        });
      }
    }
    for (const action of EXPLORER_ACTIONS) {
      this.syncExplorerActionColumnHeader(action, headerCheckboxes);
    }
  }
  async setExplorerActionColumn(action, enabled, cellCheckboxes, headerCheckboxes) {
    var _a;
    for (const objectType of EXPLORER_OBJECT_TYPES) {
      if (!this.plugin.isExplorerActionSupported(objectType, action)) continue;
      this.plugin.settings.explorerActionVisibility[objectType][action] = enabled;
      const checkbox = (_a = cellCheckboxes.get(action)) == null ? void 0 : _a.get(objectType);
      if (checkbox) checkbox.checked = enabled;
    }
    this.syncExplorerActionColumnHeader(action, headerCheckboxes);
    await this.persistExplorerActionVisibility();
  }
  syncExplorerActionColumnHeader(action, headerCheckboxes) {
    const values = EXPLORER_OBJECT_TYPES.filter(
      (objectType) => this.plugin.isExplorerActionSupported(objectType, action)
    ).map(
      (objectType) => this.plugin.settings.explorerActionVisibility[objectType][action]
    );
    const checkbox = headerCheckboxes.get(action);
    if (!checkbox) return;
    checkbox.checked = values.every(Boolean);
    checkbox.indeterminate = values.some(Boolean) && !values.every(Boolean);
  }
  async persistExplorerActionVisibility() {
    await this.plugin.saveSettings();
    this.plugin.refreshAllFeatures();
  }
  getExplorerActionLabel(action) {
    const { t } = this.plugin;
    switch (action) {
      case "copyFile":
        return t.copyFile;
      case "addNew":
        return t.newFile;
      case "addNewFolder":
        return t.newFolder;
      case "copyRelativePath":
        return t.copyRelativePath;
      case "copyAbsolutePath":
        return t.copyAbsolutePath;
      case "copyContent":
        return t.copyContent;
    }
  }
  isExplorerActionAvailableOnPlatform(action) {
    if (action !== "copyFile" && action !== "copyAbsolutePath") return true;
    return import_obsidian2.Platform.isMacOS && import_obsidian2.Platform.isDesktop;
  }
  getExplorerObjectTypeLabel(objectType) {
    const { t } = this.plugin;
    switch (objectType) {
      case "folder":
        return t.explorerFolder;
      case "markdown":
        return t.explorerMarkdown;
      case "text":
        return t.explorerText;
      case "other":
        return t.explorerOtherFiles;
    }
  }
  createSection(containerEl, title, description) {
    new import_obsidian2.Setting(containerEl).setName(title).setDesc(description).setHeading();
  }
};

/* nosourcemap */