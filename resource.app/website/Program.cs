using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System.IO;
using System.Diagnostics;

namespace website
{
    public class Program
    {
        public static void Main(string[] args)
        {
            GetPaths();
            CompileClientCode();
            CopyLatestClientBuildToWWWFolder();

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();


        public static string BuildFolderPath = "";
        public static string WWWRootFolderPath = "";
        public static void GetPaths()
        {
            var assemblyFolder = new DirectoryInfo(typeof(Program).Assembly.Location).Parent;
            var pointer = assemblyFolder;
            while (pointer.GetDirectories("ClientCode").Any() == false)
            {
                pointer = pointer.Parent;
                if (pointer == null) throw new Exception("Demo folder not found.");
            }
            var buildfolder = pointer
                ?.GetDirectories("ClientCode")?.FirstOrDefault()
                ?.GetDirectories("demo")?.FirstOrDefault()
                ?.GetDirectories("build")?.FirstOrDefault();

            var target = pointer.GetDirectories("wwwroot").FirstOrDefault();

            BuildFolderPath = buildfolder.FullName;
            WWWRootFolderPath = target.FullName;
        }
        public static void CopyLatestClientBuildToWWWFolder()
        {
            var buildfolder = new DirectoryInfo(BuildFolderPath);

            foreach(var file in buildfolder.GetFiles("*", SearchOption.AllDirectories))
            {
                var relpath = file.FullName.Substring(buildfolder.FullName.Length);
                var to = Path.Combine(WWWRootFolderPath, relpath.TrimStart('\\'));
                var info = new FileInfo(to);
                if (!info.Directory.Exists)
                    info.Directory.Create();
                if (info.Exists)
                    info.IsReadOnly = false;
                file.CopyTo(info.FullName, true);
            }

            var watch = new FileSystemWatcher(BuildFolderPath);
            watch.Changed += Watch_Changed;
            watch.Created += Watch_Changed;
        }

        private static void Watch_Changed(object sender, FileSystemEventArgs e)
        {
            var file = new FileInfo(e.FullPath);

            var relpath = file.FullName.Substring(BuildFolderPath.Length);
            var to = Path.Combine(WWWRootFolderPath, relpath.TrimStart('\\'));
            var info = new FileInfo(to);
            if (!info.Directory.Exists)
                info.Directory.Create();
            if (info.Exists)
                info.IsReadOnly = false;
            file.CopyTo(info.FullName, true);
        }


        public static void CompileClientCode()
        {

            var workingDir = new DirectoryInfo(BuildFolderPath).Parent;

            var task = new ProcessStartInfo()
            {
                WorkingDirectory = workingDir.FullName,
                Arguments = "run build",
                FileName = "npm",
                UseShellExecute = true
            };

            Process.Start(task);
        }
    }
}
